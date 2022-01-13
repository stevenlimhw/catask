import axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import '../../assets/stylesheets/application.css'
import UserView from './AppRender/UserView';
import NoUserView from './AppRender/NoUserView';

export const UserContext = React.createContext();

const App = () => {
    
    const navigate = useNavigate();

    const [ userLog, setUserLog ] = useState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {}
    });

    const handleLogin = (data) => {
        setUserLog({
            loggedInStatus: "LOGGED_IN",
            user: data.user
        });
    }

    const handleLogout = () => {

        const csrfToken = document.querySelector('[name=csrf-token]').content;
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

        axios.delete('/logout')
        .then(resp => {
            setUserLog({
                loggedInStatus: "NOT_LOGGED_IN",
                user: {}
            });
            navigate(''); // redirect to home page
        })
        .catch(err => console.log(err));
    }

    const checkLoginStatus = () => {
        axios.get('/logged_in')
        .then(resp => {
            if (resp.data.logged_in && userLog.loggedInStatus === "NOT_LOGGED_IN") {
                setUserLog({
                    loggedInStatus: "LOGGED_IN",
                    user: resp.data.user
                });   
            } else if (!resp.data.logged_in && userLog.loggedInStatus === "LOGGED_IN") {
                setUserLog({
                    loggedInStatus: "NOT_LOGGED_IN",
                    user: {}
                });
            }
        // console.log(resp.data.logged_in) // debug
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        checkLoginStatus();
    }, []);

    if (userLog.loggedInStatus === "LOGGED_IN") {
        return <UserView 
                    handleLogin={handleLogin} 
                    handleLogout={handleLogout} 
                    userLog={userLog}/>;
    } else {
        return <NoUserView
                    handleLogin={handleLogin} 
                    handleLogout={handleLogout} 
                    userLog={userLog} />;
    }
} 
  
export default App;