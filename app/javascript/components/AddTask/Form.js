import React from 'react'

const Form = (props) => {
    const { handleChange, handleSubmit, task } = props;
    return ( <div>
        <h1>Advanced options</h1>
        <div className="advanced-options-wrapper">
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="task title"
                    className="taskdetails-input"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    >
                </input>
                <input
                    placeholder="task description"
                    className="taskdetails-input"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    >
                </input>
                <input
                    placeholder="deadline"
                    className="taskdetails-input"
                    type="date"
                    name="deadline"
                    value={task.deadline}
                    onChange={handleChange}
                    >
                </input>
                <input
                    placeholder="tag"
                    className="taskdetails-input"
                    name="tag"
                    value={task.tag}
                    onChange={handleChange}
                    >
                </input>
            <div className="taskdetails-input-below">
                <button type="submit" className="btn-2">Add Task</button>
            </div>
            </form>
        </div>
    </div> );
}

export default Form;