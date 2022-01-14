import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DropDownMenu } from "../Sorting/DropDownMenu";

const AllTasks = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("/api/v1/tasks")
        .then(resp => {
            setTasks(resp.data.data);
            // console.log(resp.data.data); // debugging
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <div className="alltasks-wrapper">
                <h1>All Tasks</h1>
                <div className="alltasks-wrapper-container">
                    <button className="btn-2">Sort</button>
                    <button className="btn-2">Search</button>
                </div>
            </div>
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