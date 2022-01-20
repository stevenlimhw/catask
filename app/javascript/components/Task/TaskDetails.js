import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import UpdateTask from './UpdateTask'

const TaskDetails = () => {
    const [task, setTask] = useState({title: "", description: "", deadline: "", tag: ""});
    const id = useParams().id;
    const navigate = useNavigate();

    // fetch data from api (just the one with matching id)
    useEffect(() => {
        const source = axios.CancelToken.source();
        axios.get(`/api/v1/tasks/${id}`, {
            cancelToken: source.token
        })
        .then(resp => {
            setTask(resp.data.data.attributes);
        })
        .catch(err => console.log(err));
        return () => source.cancel();
    }, []);
    
    const deleteTask = () => {
        const csrfToken = document.querySelector('[name=csrf-token]').content;
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

        axios.delete(`/api/v1/tasks/${id}`)
        .then(resp => {
            navigate('/dashboard');
        })
        .catch(err => console.log(err));
    }

    const { title, description, deadline, tag, day } = task;
    return (
        <div>
            <h1>{title}</h1>
            <input 
                type="checkbox" 
                className="check-box"
                 />
            <h4>{description}</h4> 
            <h4>{deadline}</h4>
            <h4>{tag}</h4>
            <h4>{day}</h4>
            <div className="taskdetails-wrapper">
                <Link to={`/tasks/${id}/edit`}><div className="btn">Edit Task</div></Link>
                <button className="btn" onClick={deleteTask}>Delete Task</button>
                <Outlet />
            </div>
        </div>
    ) 
} 
 
export default TaskDetails