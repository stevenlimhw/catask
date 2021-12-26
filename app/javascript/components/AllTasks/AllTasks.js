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
        <div className="">
            <h1>All Tasks</h1>
            <h4>[Sort Options Here]</h4>
            {
                tasks.map((task) => {
                    const { id, title, description, deadline, tag } = task.attributes;
                    return (
                        <div className="wrapper" key={id}>
                            {/* <div>[Checkbox Here]</div> */}
                            <h2>{title}</h2>
                            <div>{description}</div>
                            <div>{deadline}</div>
                            <div>{tag}</div>
                            <Link to={`/tasks/${id}`}>View Task</Link>
                            <br />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AllTasks;