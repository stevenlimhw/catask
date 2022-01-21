import React, { useState, useContext } from 'react'
import Form from './Form'
import QuickForm from './QuickForm'
import axios from 'axios'
import { UserContext } from '../App'

const AddTask = (props) => {
    
    const { userLog } = useContext(UserContext);
    const initialState = {
        title: "",
        description: "",
        deadline: "",
        tag: "",
        isCompleted: false,
        user_id: ""
    };
    const [task, setTask] = useState(initialState);

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

        const user_id = userLog.user.id;
        axios.post('/api/v1/tasks', {...task, user_id})
        .then(resp => {
            setTask(initialState);
            window.location.reload();
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