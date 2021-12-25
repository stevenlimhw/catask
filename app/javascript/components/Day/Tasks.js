import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Tasks = () => {
    const today = new Date();
    const date_today = today.getFullYear() + '-' + (today.getMonth() + 1)
                 + '-' + today.getDate();
    // getMonth() starts with 0 for January

    const [tasks, setTasks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        axios.get('/api/v1/tasks')
        .then(resp => {
            setTasks(resp.data.data);
            setIsLoaded(true);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div>
        {
            isLoaded &&
            <Fragment>
                {
                    tasks.filter((task) => {
                        const { deadline } = task.attributes;
                        return deadline === date_today;
                    })
                    .map((task) => {
                        const { id, deadline, day, title, description, isCompleted, tag } = task.attributes;
                        return <Fragment key={id}>
                            <div className="checkbox">[Checkbox here]</div>
                            <div>{title}</div>
                            <div>{deadline}</div>
                            <div className="tag">{tag}</div>
                            <div>{id}</div>
                            <Link to={`/tasks/${id}`} className="title">View Task</Link>
                            <br/>
                        </Fragment>
                    })
                }
            </Fragment>
        }
        </div>
    )
}

export default Tasks