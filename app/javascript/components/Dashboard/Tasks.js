import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
import { Link, Navigate } from 'react-router-dom'
import '../../../assets/stylesheets/application.css'

const Tasks = () => {

    // dayjs initialisation
    const dayjs = require('dayjs');
    const isoWeek = require('dayjs/plugin/isoWeek');
    dayjs.extend(isoWeek);

    const [tasks, setTasks] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        axios.get('/api/v1/tasks')
        .then(resp => {
            // resp.data is an array of objects
            setTasks(resp.data.data)
            setIsLoaded(true)
        })
        .catch(resp => console.log(resp))
    }, [])
    const day_numbers = [0, 1, 2, 3, 4, 5, 6, 7]
    const day_names = ["Inbox", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    // Inbox is for tasks without a deadline
    
    return <div>
        {
            isLoaded &&
            <div className="dashboard-wrapper">
            {
            day_numbers 
            .map(day_number =>
                { 
                    return <div className="dashboard-card"> 
                        <div className="dashboard-day-title">{day_names[day_number]}</div>
                        {
                            tasks
                            .filter(task => {
                                const { day, deadline } = task.attributes
                                return (day === day_number) && 
                                       (dayjs(deadline).isoWeek() === dayjs().isoWeek());
                            }) 
                            .map(task => {
                                const { id, deadline, day, title, description, isCompleted, tag } = task.attributes
                                return <Link to={`/tasks/${id}`}> 
                                    <div key={id} className="dashboard-task">
                                        {/* <div className="checkbox">[Checkbox here]</div> */}
                                        {/* <div>{dayjs(deadline).format("DD/MM/YYYY")}</div> */}
                                        {/* <div className="tag">{tag}</div> */}
                                        <div className="task-title">{title}</div>
                                    </div> 
                                </Link> 
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