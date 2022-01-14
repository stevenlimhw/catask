import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';

const Registration = () => {

    const { userLog, handleLogin } = useContext(UserContext);
    const navigate = useNavigate();

    const [ user, setUser ] = useState(
        {
            email: "",
            password: "",
            password_confirmation: "",
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

        axios.post('/registrations', {user: user}) // { withCredentials: true}
        .then(resp => {
            setUser({
                email: "",
                password: "",
                password_confirmation: "",
                registrationErrors: ""});
            if (resp.data.status === 'created') {
                handleSuccessfulAuth(resp.data);
            }
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Sign up</h1>
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
                <input
                    className="taskdetails-input"
                    type="password"
                    name="password_confirmation"
                    value={user.password_confirmation}
                    placeholder="confirm password"
                    onChange={handleChange} />
                <button type="submit" className="btn">Sign up</button>
            </form>
        </div>
    );
}

export default Registration;