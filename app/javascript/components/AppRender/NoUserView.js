import React, { Fragment, useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import '../../../assets/stylesheets/application.css'
import { UserContext } from '../App'

const NoUserView = (props) => {
    const { handleLogin, handleLogout, userLog } = props;

    return ( <UserContext.Provider value={{ userLog, handleLogin }}>
        <div className="header">
            <nav>
                <div className="navigation">
                    <Link to='/' className="navigation-link">Home</Link>
                </div>
            </nav>
            <div className="nav-btn-wrapper">
                <Link to='register' className="navigation-link">Sign up</Link>
                <Link to='login' className="navigation-link">Log in</Link>
            </div>
        </div> 
        <Outlet />
    </UserContext.Provider> );
}

export default NoUserView;