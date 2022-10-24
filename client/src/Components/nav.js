import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getCountries} from "../redux/actions"
// import "./css/nav.css"
// import "./css/home.css"

const nav = (props)=>{

    const paises = useSelector((state)=>state.country)
    const dispatch = useDispatch()
    
    const recargar = (event)=>{
        dispatch(getCountries())
    }

    return(
        <div >
            <Link to="/home" onClick={recargar}>
                Home
            </Link>
            <Link to="/home/createActivity">
                Crear Actividad
            </Link>
           
        </div>
    )
}

export default nav