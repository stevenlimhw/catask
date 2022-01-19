import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllTasks = () => {

    const [tasks, setTasks] = useState([]);
    // const [sortedTasks, setSortedTasks] = useState([]);
    const [sortBy, setSortBy] = useState("");

    const handleSort = (type) => {
        const types = {title: "title", deadline: "deadline", tag: "tag"};
        const sortType = types[type];
        const sortedArr = [...tasks].sort(
            (a, b) => a.attributes[sortType].localeCompare(b.attributes[sortType])
        );
        // setSortedTasks(sortedArr);
        setTasks(sortedArr);
    }

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios.get("/api/v1/tasks", {
            cancelToken: source.token
        })
        .then(resp => {
            setTasks(resp.data.data);
        })
        .catch(err => console.log(err));
        return () => {
            source.cancel();
        }
    }, []);

    useEffect(() => {
        handleSort(sortBy);
    }, [sortBy]);

    return (
        <div>
            <div className="alltasks-wrapper">
                <h1>All Tasks</h1>
                <div className="alltasks-wrapper-container">
                    <select className="btn-2" defaultValue={"default"} 
                            onChange={e => setSortBy(e.target.value)}>
                        <option value="default" disabled>sort by</option>
                        <option value="title">title</option>
                        <option value="deadline">deadline</option>
                        <option value="tag">tag</option>
                    </select>
                    <button className="btn-2">search</button>
                </div>
            </div>
            <div className="tasks-container">
            {
                tasks.map((task) => {
                    const { id, title, description, deadline, tag } = task.attributes;
                    return ( 
                        <Link to={`/tasks/${id}`} key={id}>
                            <div className="alltasks-task">
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