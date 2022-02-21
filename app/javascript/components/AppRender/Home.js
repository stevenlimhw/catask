import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => { 
    return <div className="home">
        <div className="home-wrapper">
            <p>Categorise and pet cats with Catask</p>
            <NavLink to="register" className="btn">Get Petting</NavLink>
        </div>
    </div>
}

export default Home;