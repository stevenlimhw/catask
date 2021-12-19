import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'

const Task = () => {
    const [tasks, setTasks] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        axios.get('/api/v1/tasks.json')
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
                                const { day } = task.attributes
                                return day === day_number
                            })
                            .map(task => {
                                const { id, deadline, day, title, description, isCompleted, tag } = task.attributes
                                return <Fragment key={id}>
                                    <div className="checkbox">[Checkbox here]</div>
                                    <div className="title">{title}</div>
                                    <div>{deadline}</div>
                                    <div className="tag">{tag}</div>
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

export default Task