import React from "react";
import { Link } from "react-router-dom";
import "./CornsilkDiv.css";

export default function Header({cartLenght}) {
    return (
        <header className="cornsilk-div">
            <div>
                <h1>Freelance Central of Departments</h1>
                <p>You bring the work, We get you work!</p>
            </div>
                <Link to="/cart">
                <img 
                    className="shopping-cart"
                    src="/shopping-cart.png"
                    alt="shopping-cart" 
                />
                </Link>
                <span className="cart-length">{cartLenght}</span>
        </header>
    );
}