import React, { Fragment, useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import '../../../assets/stylesheets/application.css'
import { UserContext } from '../App'

const UserView = (props) => {
    const { handleLogin, handleLogout, userLog } = props;
    return ( <UserContext.Provider value={{ userLog, handleLogin }}>
    <div className="">
        <div className="header">
            <nav>
                <div className="navigation">
                    <Link to='/' className="navigation-link">Home</Link>
                    <Link to='dashboard' className="navigation-link">Dashboard</Link>
                    <Link to='today' className="navigation-link">Today</Link>
                    <Link to='tasks' className="navigation-link">Tasks</Link>
                </div>
            </nav>
            <button className='navigation-link' onClick={handleLogout}>Log out</button>
        </div>
        <Outlet /> 
    </div>  
    </UserContext.Provider> );
}

export default UserView;