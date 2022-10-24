import { Link } from "react-router-dom";

const enviado = ()=>{


    return (
        <div>
            <p>ENVIADO</p>
            <div>
                <Link to="/home/createActivity">   
                <button>Nueva Actividad</button>
                </Link>

                <Link to="/home">
                <button> Volver al menú principal</button>
                </Link>
                    
            </div>
        </div>       
    )
}

export default enviado;