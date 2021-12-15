import React, { Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom'


const App = () => {
    return <Fragment>
        <nav className="navigation">
            <Link to='/'>Home</Link>
            <Link to='dashboard'>Dashboard</Link>
            <Link to='today'>Today</Link>
            {/* TODO: Logout link here */}
        </nav>
        <Outlet />
    </Fragment>
}

export default App