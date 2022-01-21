import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateTask = () => {

    // dayjs initialisation
    // const dayjs = require('dayjs');

    const id = useParams().id;
    const [ newTask, setNewTask ] = useState({title: "", description: "", deadline: "", tag: ""});
    const navigate = useNavigate();

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios.get(`/api/v1/tasks/${id}`, {
            cancelToken: source.token
        })
        .then(resp => {
            setNewTask(resp.data.data.attributes);
        })
        .catch(err => console.log(err))
        return () => {
            source.cancel();
        }
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const csrfToken = document.querySelector('[name=csrf-token]').content;
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

        axios.put(`/api/v1/tasks/${id}`, newTask)
        .then(resp => {
            navigate(`/tasks/${id}`); // exit 'edit mode' by redirection
            window.location.reload(); // reload to show changes made
        })
        .catch(err => console.log(err));
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setNewTask({...newTask, [name]: value});
    }

    const handleDiscardChanges = () => {
        navigate(`/tasks/${id}`); // exit 'edit mode' by redirection
        window.location.reload(); // reload to show changes made
    }
 
    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="task title"
                    className="taskdetails-input"
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleChange}></input>
                <input 
                    placeholder="task description"
                    className="taskdetails-input"
                    type="text"
                    name="description"
                    value={newTask.description}
                    onChange={handleChange}></input>
                <input 
                    className="taskdetails-input"
                    type="date"
                    name="deadline"
                    value={newTask.deadline}
                    onChange={handleChange}></input>
                <input 
                    placeholder="tags"
                    className="taskdetails-input"
                    type="text"
                    name="tag"
                    value={newTask.tag}
                    onChange={handleChange}></input>
                <div className="taskdetails-input-below">
                    <button type="submit" className="btn">Save Changes</button>
                    <button onClick={handleDiscardChanges} className="btn">Discard Changes</button>
                </div>
            </form>
        </div>
    )
}
export default UpdateTask;