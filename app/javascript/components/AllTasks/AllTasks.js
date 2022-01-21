import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const AllTasks = () => {

    const [tasks, setTasks] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSort = (type) => {
        const types = {title: "title", deadline: "deadline", tag: "tag"};
        const sortType = types[type];
        const sortedArr = [...tasks].sort(
            (a, b) => {
                // prevent errors caused by null values
                if (a.attributes[sortType] == null) {
                    return 1;
                } else if (b.attributes[sortType] == null) {
                    return -1;
                } else {
                    return a.attributes[sortType].localeCompare(b.attributes[sortType]);
                }
            }
        );
        setTasks(sortedArr);
    }

    const handleSearch = (e) => {
        const filter = e.target.value;
        if (filter) {
            setSearchParams({ filter });
        } else {
            setSearchParams({});
        }
    }

    const filterSearch = (task) => {
        const filter = searchParams.get("filter");
        const title = task.attributes.title.toLowerCase();
        return (!filter) ? true : title.startsWith(filter.toLowerCase());
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
                    <input
                        placeholder="search task title"
                        className="search-input"
                        value={searchParams.get("filter") || ""}
                        onChange={handleSearch} />
                </div>
            </div>
            <div className="tasks-container">
            {
                tasks
                .filter(filterSearch)
                .map((task) => {
                    const { id, title, description, deadline, tag, isCompleted } = task.attributes;
                    return ( 
                        <Link to={`/tasks/${id}`} key={id}>
                            <div className="alltasks-task column-order">
                                <div className={isCompleted ? "task-title-done" : "task-title"}>{title}</div>
                                <div className="task-description">{description}</div>
                                <div className="task-description">{deadline}</div>
                                <div className="tag">{tag}</div>
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