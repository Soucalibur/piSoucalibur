import { Link } from "react-router-dom";

import "./css/intro.css"


const intro = ()=>{

    return(

        <div className="contenedorIntro">

            {/* /////////////// Titulo /////////////////////// */}
            <div id="titulo">
                <h1>Bienvenidos a Henry Countries</h1>
            </div>
            {/* /////////////// Titulo /////////////////////// */}
            
            {/* /////////////// Link ///////////////////////// */}
            <div id="link">

                <Link to="/home">
                    <h3>Ingresar</h3>
                </Link>
                
            </div>
            {/* /////////////// Link ///////////////////////// */}

            {/* /////////////// Imagen Fondo ///////////////// */}
            <div id="img"></div>
            {/* /////////////// Imagen Fondo ///////////////// */}
            
        </div>
    )
}

export default intro;