import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateTask = () => {
    const id = useParams().id;
    const [ newTask, setNewTask ] = useState({title: "", description: "", deadline: "", tag: ""});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/v1/tasks/${id}`)
        .then(resp => {
            setNewTask(resp.data.data.attributes);
        })
        .catch(err => console.log(err))
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
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleChange}></input>
                <input 
                    type="text"
                    name="description"
                    value={newTask.description}
                    onChange={handleChange}></input>
                <input 
                    type="date"
                    name="deadline"
                    value={newTask.deadline}
                    onChange={handleChange}></input>
                <input 
                    type="text"
                    name="tag"
                    value={newTask.tag}
                    onChange={handleChange}></input>
                <button type="submit">Save Changes</button>
                <button onClick={handleDiscardChanges}>Discard Changes</button>
            </form>
        </div>
    )
}

export default UpdateTask;