import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getCountries} from "../redux/actions"

import "./css/nav.css"


const nav = (props)=>{

    // Hooks ////////////////////////////////////////////////

    const paises = useSelector((state)=>state.country)
    const dispatch = useDispatch()
    
    /////////////////////////////////////////////////////////

    // Link y dispatch //////////////////////////////////////

    const recargar = (event)=>{
        dispatch(getCountries())
    }

    /////////////////////////////////////////////////////////


    return(
        <div className="contenedorNav">
            
            {/* //////////////// Link Home ////////////////////// */}
            <div >
                <Link to="/home" onClick={recargar}>
                    Home
                </Link>
            </div>
            {/* //////////////// Link Home ////////////////////// */}
             
            {/* //////////////// Titulo inicial ///////////////////////// */}
            <h2 className="nombreAplicacion">Henry Countries</h2>
            {/* //////////////// Titulo inicial ///////////////////////// */}

            {/* //////////////// Link Nueva Actividad ////////////////////// */}
            <div >
                <Link to="/home/createActivity">
                    Crear Actividad
                </Link>
            </div>
            {/* //////////////// Link Nueva Actividad ////////////////////// */}
           
        </div>
    )
}

export default nav