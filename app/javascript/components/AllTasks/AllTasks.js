import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllTasks = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("/api/v1/tasks")
        .then(resp => {
            setTasks(resp.data.data);
            console.log(resp.data.data);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>All Tasks</h1>
            <h4>[Sort Options Here]</h4>
            <br />
            <div className="tasks-container">
            {
                tasks.map((task) => {
                    const { id, title, description, deadline, tag } = task.attributes;
                    return (
                        <Link to={`/tasks/${id}`}>
                            <div className="alltasks-task" key={id}>
                                <div className="task-title">{title}</div>
                                <div className="task-description">{description}</div>
                                <div>{deadline}</div>
                                <div>{tag}</div>
                                <br />
                            </div>
                        </Link>
                    ) 
                }) 
            } 
            </div>
        </div>
    )
}

export default AllTasks;