import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <>
        <div className="navbar-v1">
        <Link to="/">
            <button>Home</button>
        </Link>
            <button>About</button>
            <button>Products</button>
            <button>Contact</button>
        </div>
        </>
    );
}