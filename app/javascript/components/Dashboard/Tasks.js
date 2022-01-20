import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
import { Link, Navigate } from 'react-router-dom'
import '../../../assets/stylesheets/application.css'

const Tasks = () => {

    // dayjs initialisation
    const dayjs = require('dayjs');
    const isoWeek = require('dayjs/plugin/isoWeek');
    dayjs.extend(isoWeek);

    const [tasks, setTasks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios.get('/api/v1/tasks', {
            cancelToken: source.token
        })
        .then(resp => {
            setTasks(resp.data.data);
            setIsLoaded(true);
        })
        .catch(resp => console.log(resp));
        return () => {
            source.cancel();
        }
    }, []);

    const handleChecked = (task) => {
        const { id, isCompleted } = task.attributes;

        const csrfToken = document.querySelector('[name=csrf-token]').content;
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

        axios.put(`/api/v1/tasks/${id}`, {...task, isCompleted: !isCompleted})
        .then(resp => window.location.reload())
        .catch(err => console.log(err));
    }

    const day_numbers = [0, 1, 2, 3, 4, 5, 6, 7]
    const day_names = ["Inbox", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    
    return <div>
        {
            isLoaded &&
            <div className="dashboard-wrapper">
            {
            day_numbers 
            .map(day_number =>
                { 
                    return <div className="dashboard-card" key={day_number}> 
                        <div className="dashboard-day-title">{day_names[day_number]}</div>
                        { 
                            tasks 
                            .filter(task => { 
                                const { day, deadline } = task.attributes
                                return (day === day_number) && 
                                       (dayjs(deadline).isoWeek() === dayjs().isoWeek());
                            }) 
                            .map(task => {
                                const { id, deadline, day, title, description, isCompleted, tag } = task.attributes;
                                return <div className="dashboard-task" key={day_number + id}>
                                    <input 
                                        type="checkbox"
                                        className="checkbox"
                                        checked={isCompleted}
                                        onChange={() => handleChecked(task)}
                                        />
                                    <Link to={`/tasks/${id}`}>
                                        <div className="task-title-wrapper">
                                            <div className={isCompleted ? "task-title-done" : "task-title"}>{title}</div>
                                            <div className="task-description">Due: {dayjs(deadline).format("DD/MM/YYYY")}</div>
                                            <div className="tag">{tag}</div>
                                        </div> 
                                    </Link>
                                </div> 
                            })
                        }
                    </div>    
                })
            } 
            </div>
        }
    </div>
}

export default Tasks