import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Outlet, Link, useNavigate } from 'react-router-dom'

const TaskDetails = () => {
    const [task, setTask] = useState({title: "", description: "", deadline: "", tag: "", isCompleted: false});
    const id = useParams().id;
    const navigate = useNavigate();

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

    const handleChecked = () => {
        const csrfToken = document.querySelector('[name=csrf-token]').content;
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

        axios.put(`/api/v1/tasks/${id}`, {...task, isCompleted: !isCompleted})
        .then(resp => window.location.reload())
        .catch(err => console.log(err));
    }

    const { title, description, deadline, tag, day, isCompleted } = task;
    return (
        <div className="taskdetails-background">
            <h1>{title}</h1>
            <div>
                <div className="tag taskdetails-left-indent">{tag}</div>
                <input 
                    type="checkbox" 
                    className="checkbox"
                    checked={isCompleted}
                    onChange={handleChecked}
                    /> 
            </div>
            <div className="taskdetails-content-wrapper">
                <h4>Description: </h4>
                <div className="task-description taskdetails-left-indent">{description}</div> 
                <h4>Due: {deadline}</h4>
                <div className="taskdetails-wrapper">
                    <Link to={`/tasks/${id}/edit`}><div className="btn">Edit Task</div></Link>
                    <button className="btn" onClick={deleteTask}>Delete Task</button>
                    <Outlet /> 
                </div>
            </div>
        </div>
    ) 
}
 
export default TaskDetails