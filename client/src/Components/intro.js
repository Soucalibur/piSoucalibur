import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const intro = ()=>{

    return(
        <div>
            <h1>COMPONENTE INTRO</h1>
            <Link to="/home">
            <h3>LINK TO HOME</h3>
            </Link>
            <br/>
            <h2>AGREGAR IMAGENES Y EFECTOS</h2>
        </div>
    )
}

export default intro;