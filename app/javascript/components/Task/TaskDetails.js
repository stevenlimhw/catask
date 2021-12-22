import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Outlet, Link } from 'react-router-dom'
import UpdateTask from './UpdateTask'

const TaskDetails = () => {
    const [task, setTask] = useState({title: "", description: "", deadline: "", tag: ""});
    const id = useParams().id;

    // fetch data from api (just the one with matching id)
    useEffect(() => {
        axios.get(`/api/v1/tasks/${id}`) // invokes show method in controller
        .then(resp => {
            setTask(resp.data.data.attributes);
        })
        .catch(err => console.log(err))
    }, []);
    
    const { title, description, deadline, tag } = task;
    return (
        <div className="wrapper">
            <h1>{title}</h1>
            <h4>{description}</h4>
            <h4>{deadline}</h4>
            <h4>{tag}</h4>
            <Link to={`/tasks/${id}/edit`} className="button">Edit Task</Link>
            <Outlet />
        </div>
    )
}

export default TaskDetails