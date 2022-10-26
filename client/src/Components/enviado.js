import { Link } from "react-router-dom";

import "./css/enviado.css"
import img from "./css/img/Home_img/Continente.jpg"


const enviado = ()=>{


    return (

        <div className="contenedorEnviado">
            {/*  /////////////////// Imagen Fondo ///////////////////// */}
            <img src={img} className="imgEnviado" />
            {/*  /////////////////// Imagen Fondo ///////////////////// */}
            
            {/*  /////////////////// Informacion Mensaje Enviado ///////////////////// */}
            <div className="contenedorMensaje">
                
                <p className="enviado">ENVIADO</p>
                
                <div className="opciones">
                    
                    {/*  /////////////////// Link Crear Actividad ///////////////////// */}
                    <Link to="/home/createActivity">   
                        <h3 >Nueva Actividad</h3>
                    </Link>
                    {/*  /////////////////// Link Crear Actividad ///////////////////// */}

                    {/*  /////////////////// Link Home ///////////////////// */}
                    <Link to="/home">
                        <h3 > Volver al menú principal</h3>
                    </Link>
                    {/*  /////////////////// Link Home ///////////////////// */}
                        
                </div>

            </div>
            {/*  /////////////////// Informacion Mensaje Enviado ///////////////////// */}

        </div>       
    )
}

export default enviado;