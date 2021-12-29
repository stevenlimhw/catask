import React, { Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../../assets/stylesheets/application.css'

const App = () => {
    return <div>
        <div className="header">
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB7vmXM0JilN4I8VFwvzqzWJfyoaq7qAsRzuBoWFnQFKgt9azZnUdEHtxw4CGdJMtOPZY&usqp=CAU" /> */}
            <nav>
                <ul className="navigation">
                    <li>
                        <Link to='/' className="navigation-link">Home</Link>
                    </li> 
                    <li>
                        <Link to='dashboard' className="navigation-link">Dashboard</Link>
                    </li>
                    <li> 
                        <Link to='today' className="navigation-link">Today</Link>
                    </li>
                    <li>
                        <Link to='tasks' className="navigation-link">Tasks</Link>
                    </li> 
                    {/* TODO: Logout link here */}
                </ul>
            </nav>
            <Link to="/" className="navigation-link">Log in</Link>
        </div>
        <Outlet />
    </div>  
} 
  
export default App