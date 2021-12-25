import React, { Fragment } from 'react'
import AddTask from '../AddTask/AddTask'
import Tasks from './Tasks'

const Dashboard = () => {
    return <Fragment>
        <h1>Dashboard</h1>
        
        <div className="dashboard-wrapper">
            {/* one card for each day */}
            <Tasks />
        </div>

        <div className="add-task">
            <AddTask />
        </div>
    </Fragment>
}

export default Dashboard