import React, { Fragment } from 'react'
import AddTask from '../AddTask/AddTask'
import Tasks from './Tasks'
import '../../../assets/stylesheets/application.css'

const Dashboard = () => {
    return <Fragment>
        <h1>Dashboard</h1>
        <div>
            <AddTask isQuickForm={true}/>
        </div>
        <div>
            {/* one card for each day */}
            <Tasks />
        </div>
    </Fragment>
}

export default Dashboard