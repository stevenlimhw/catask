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
        axios.get(`/api/v1/tasks/${id}`) // invokes show method in controller
        .then(resp => {
            setTask(resp.data.data.attributes);
        })
        .catch(err => console.log(err))
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

    const { title, description, deadline, tag } = task;
    return (
        <div className="wrapper">
            <h1>{title}</h1>
            <h4>{description}</h4>
            <h4>{deadline}</h4>
            <h4>{tag}</h4>
            <button><Link to={`/tasks/${id}/edit`} className="button">Edit Task</Link></button>
            <button onClick={deleteTask}>Delete Task</button>
            <Outlet />
        </div>
    )
}

export default TaskDetails