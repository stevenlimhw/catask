import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
import { Link, Navigate } from 'react-router-dom'
import CurrentWeek from '../DateTime/CurrentWeek'

const Tasks = () => {
    const [tasks, setTasks] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        axios.get('/api/v1/tasks')
        .then(resp => {
            // resp.data is an array of objects
            setTasks(resp.data.data)
            setIsLoaded(true)
        })
        .catch(resp => console.log(resp))
    }, [])
    const day_numbers = [0, 1, 2, 3, 4, 5, 6, 7]
    const day_names = ["Inbox", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    // Inbox is for tasks without a deadline
    
    return <div className="">
        {
            isLoaded &&
            <Fragment>
            {
            day_numbers
            .map(day_number =>
                {
                    return <div className="column-card">
                        <h1>{day_names[day_number]}</h1>
                        {
                            tasks
                            .filter(task => {
                                const { day, deadline } = task.attributes
                                return day === day_number && <CurrentWeek date={deadline} />;
                            })
                            .map(task => {
                                const { id, deadline, day, title, description, isCompleted, tag } = task.attributes
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
                    </div>
                })
            }
            </Fragment>
        }
    </div>
}

export default Tasks