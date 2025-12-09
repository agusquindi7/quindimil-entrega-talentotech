import React from "react";
import cryingMeme from "../assets/CryingMeme.png";

export default function Notfound() {
    return (
        <div style={
            {
            textAlign: 'center', 
            marginTop: '50px',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Segoe UI'
            }
            }>
            <h1>ERROR 404</h1>
            <h2>Página no encontrada</h2>
            <img src={cryingMeme} alt="Cryingmeme" />
        </div>
    );
}