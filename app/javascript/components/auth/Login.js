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
    );

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

        axios.post('/sessions', {user: user})
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
        <div className="taskdetails-background">
            <h1>Log in</h1>
            <form onSubmit={handleSubmit} className="taskdetails-wrapper">
                <input
                    className="taskdetails-input"
                    type="email"
                    name="email"
                    value={user.email}
                    placeholder="email address"
                    onChange={handleChange} />
                <input
                    className="taskdetails-input"
                    type="password"
                    name="password"
                    value={user.password}
                    placeholder="password"
                    onChange={handleChange} />
                <button type="submit" className="btn">Log in</button>
            </form>
        </div>
    );
}

export default Login;