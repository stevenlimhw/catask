import React from 'react'
import { Link } from 'react-router-dom';

const QuickForm = (props) => {
    const { handleChange, handleSubmit, task } = props;
    return (
        <div>
            <form onSubmit={handleSubmit} className="quickform">
                <div className="quickform-wrapper"> 
                    <input
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        placeholder="task title"
                        className="title-input"
                        >
                    </input>
                    <button type="submit" className="add-btn">
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/32/32339.png"
                            alt="Add Task"
                            id="addtask-icon"
                        />  
                    </button> 
                </div>
                <input 
                    type="date"
                    name="deadline"
                    value={task.deadline} 
                    onChange={handleChange} 
                    placeholder="task deadline"
                    >
                </input> 
            <Link to="/addtaskadvanced">more fields</Link>
            </form>
        </div>
    )
} 

export default QuickForm
 