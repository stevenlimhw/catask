import React from 'react'
import Tasks from './Tasks'
import AddTask from '../AddTask/AddTask'

const Today = () => {
    return (
        <div>
            <h1>Tasks for Today</h1>
            <div>
                <Tasks />
            </div>
            <div>
                <AddTask isQuickForm={true} />
            </div>
        </div>
    )
}

export default Today