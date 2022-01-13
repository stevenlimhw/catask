import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';

const Login = () => {

    const { userLog, handleLogin } = useContext(UserContext);
    const navigate = useNavigate();

    const [ user, setUser ] = useState(
        {
            email: "",
            password: "",
            registrationErrors: ""
        }
    )

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user, [name]: value});
    }

    const handleSuccessfulAuth = (data) => {
        handleLogin(data);
        navigate("/dashboard");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const csrfToken = document.querySelector('[name=csrf-token]').content;
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

        axios.post('/sessions', {user: user}) // { withCredentials: true}
        .then(resp => {
            setUser({
                email: "",
                password: "",
                registrationErrors: ""});
            if (resp.data.status === 'created') {
                handleSuccessfulAuth(resp.data);
            }
            }).catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Login Status: {userLog.loggedInStatus}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    placeholder="email here"
                    onChange={handleChange} />
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    placeholder="password here"
                    onChange={handleChange} />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default Login;