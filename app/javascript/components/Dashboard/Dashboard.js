import React, { Fragment } from 'react'
import AddTask from '../AddTask/AddTask'
import Tasks from './Tasks'
import '../../../assets/stylesheets/application.css'

const Dashboard = () => {
    return <Fragment>
        <h1>Dashboard</h1>
        <div>
            {/* one card for each day */}
            <Tasks />
        </div>

        <div>
            <AddTask />
        </div>
    </Fragment>
}

export default Dashboard