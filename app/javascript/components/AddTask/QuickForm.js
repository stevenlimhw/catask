import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const QuickForm = (props) => {
    const { handleChange, handleSubmit, task } = props;
    return (
        <div className="quickform-wrapper">
            <form onSubmit={handleSubmit}>
                    <div className="quickform-top-row">
                        <input 
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            placeholder="task title"
                            className="title-input"
                            >
                        </input>
                        <button type="submit" className="add-btn">+</button>
                    </div> 
                    <div className="quickform-bottom-row">
                        <input 
                            type="date"
                            name="deadline"
                            value={task.deadline} 
                            onChange={handleChange} 
                            className="date-input"
                            > 
                        </input>
                        <Link to="/addtaskadvanced" className="fields-btn">more fields</Link>
                    </div>
            </form> 
        </div>
    )
}

export default QuickForm
 