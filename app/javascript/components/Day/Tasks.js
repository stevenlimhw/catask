import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import '../../../assets/stylesheets/application.css'
import { UserContext } from '../App'

const Tasks = () => {

    const today = new Date();
    const date_today = today.toISOString().slice(0, 10); // YYYY-MM-DD
    // getMonth() starts with 0 for January

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
        .catch(err => console.log(err));
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

    return ( 
        <div>
        {
            isLoaded &&
            <div className="today-wrapper">
                { 
                    tasks.filter((task) => {
                        const { deadline } = task.attributes;
                        return deadline === date_today;
                    })
                    .map((task) => {
                        const { id, deadline, day, title, description, isCompleted, tag } = task.attributes;
                        return <div className="alltasks-task" key={id}>
                            <input 
                                type="checkbox"
                                className="checkbox"
                                checked={isCompleted}
                                onChange={() => handleChecked(task)}
                                />
                            <Link to={`/tasks/${id}`}>
                                <div className={isCompleted ? "task-title-done" : "task-title"}>{title}</div>
                                <div className="task-description">{description}</div>
                                <div className="tag">{tag}</div>
                            </Link>
                        </div>
                    })
                }
            </div> 
        }
        </div>
    )
}

export default Tasks; 