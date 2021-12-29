import React, { Fragment, useState, useEffect } from 'react'
import Form from './Form'
import QuickForm from './QuickForm'
import axios from 'axios'



const AddTask = (props) => {

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


    return props.isQuickForm 
    ? (
        <div>
            <QuickForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                task={task}
            />
        </div>
    )
    : (
        <div>
            <Form 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                task={task} 
                />
        </div>
    );
}

export default AddTask