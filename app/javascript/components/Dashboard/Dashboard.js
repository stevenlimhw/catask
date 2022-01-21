import React, { useContext } from 'react'
import AddTask from '../AddTask/AddTask'
import Tasks from './Tasks'
import '../../../assets/stylesheets/application.css'
import { UserContext } from '../App'
import { Outlet } from 'react-router'

const Dashboard = () => {
    const { userLog } = useContext(UserContext);
    const email = userLog.user.email;
    return <div>
        <h1>Dashboard</h1>
        <h4>Welcome back, {email}</h4>
        <div>
            <AddTask isQuickForm={true}/>
            <Outlet />
        </div>
        <div>
            <Tasks />
        </div>
    </div>
}

export default Dashboard