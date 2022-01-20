import React, { Fragment, useState, useEffect } from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import '../../../assets/stylesheets/application.css'
import { UserContext } from '../App'

const UserView = (props) => {
    const { handleLogin, handleLogout, userLog } = props;
    return ( <UserContext.Provider value={{ userLog, handleLogin }}>
    <div>
        <div className="header">
            <nav>
                <div className="navigation">
                    <NavLink to='/' 
                        className={({ isActive }) => isActive ? "active-link" : "navigation-link"}>Home</NavLink>
                    <NavLink to='dashboard' 
                        className={({ isActive }) => isActive ? "active-link" : "navigation-link"}>Dashboard</NavLink>
                    <NavLink to='today' 
                        className={({ isActive }) => isActive ? "active-link" : "navigation-link"}>Today</NavLink>
                    <NavLink to='tasks' 
                        className={({ isActive }) => isActive ? "active-link" : "navigation-link"}>Tasks</NavLink>
                </div>
            </nav>
            <button className='navigation-link' onClick={handleLogout}>Log out</button>
        </div> 
        <Outlet />
    </div> 
    </UserContext.Provider> );
}

export default UserView;