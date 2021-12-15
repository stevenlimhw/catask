import React, { Fragment } from 'react'
import AddTask from './AddTask'

const Dashboard = () => {
    return <Fragment>
        <h1>Dashboard</h1>
        <div className="dashboard-wrapper">
            {/* one card for each day */}
            <div className="grid">Mon</div>
            <div className="grid">Tue</div>
            <div className="grid">Wed</div>
            <div className="grid">Thu</div>
            <div className="grid">Fri</div>
            <div className="grid">Sat</div>
            <div className="grid">Sun</div>
        </div>
        <div className="add-task">
            <AddTask />
        </div>
    </Fragment>
}

export default Dashboard