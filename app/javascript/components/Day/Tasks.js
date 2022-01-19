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
                        return <Link to={`/tasks/${id}`} key={id}>
                            <div className="alltasks-task">
                                <div className="task-title">{title}</div>
                                <div className="task-description">{description}</div>
                                <div>Due: {deadline}</div>
                                <div className="tag">{tag}</div>
                            </div>
                        </Link>
                    })
                }
            </div> 
        }
        </div>
    )
}

export default Tasks;