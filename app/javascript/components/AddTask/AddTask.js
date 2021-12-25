import React, { Fragment, useState, useEffect } from 'react'
import Form from './Form'
import axios from 'axios'



const AddTask = () => {

    const [task, setTask] = useState({title: "", description: "", deadline: "", tag: ""});

    // modify text in form
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTask({...task, [name]: value});
    }

    // create task

    const handleSubmit = (e) => {
        e.preventDefault();
        const csrfToken = document.querySelector('[name=csrf-token]').content;
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

        axios.post('api/v1/tasks', task)
        .then(resp => {
            setTask({title: "", description: "", deadline: "", tag: ""});
            window.location.reload(); // change will immediately appear
            // TODO: make a certain notice that task has been added
        })
        .catch(error => console.log(error));

    }


    return (
        <Fragment>
            <Form 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                task={task} 
                />
        </Fragment>
    )
}

export default AddTask