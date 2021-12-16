import React from 'react'

const Form = (props) => {
    const { handleChange, handleSubmit, task } = props;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    >
                </input>
                <input
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    >
                </input>
                <input
                    type="date"
                    name="deadline"
                    value={task.deadline}
                    onChange={handleChange}
                    >
                </input>
                <input
                    name="tag"
                    value={task.tag}
                    onChange={handleChange}
                    >
                </input>
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Form