import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getDetail, clean} from "../redux/actions"

import "./css/pais.css"
import img from "./css/img/Pais_img/200.webp"



const pais = (props)=>{

    // Variables y hooks ///////////////////////////////////

    const paisId = props.match.params.id;
    const dispatch = useDispatch();
    const paisDetalle = useSelector((state)=>state.search)
    
    const [nameAct,setNameAct] = useState("")

    ////////////////////////////////////////////////////////

    // Ciclo de vida ///////////////////////////////////////

    useEffect(()=>{
        dispatch(getDetail(paisId))
        
        return(
            dispatch(clean())
        )

    },[dispatch])

    ////////////////////////////////////////////////////////

    const mostrarActividad = (event)=>{
        event.preventDefault();
        
        setNameAct(event.target.value)
    }
    
    
    // Renderizado /////////////////////////////////////////

    if(!paisDetalle.length){
        return(
            <div>
                <h1>CARGANDO...</h1>
            </div>
        )
    }else{
        
        const actividadSeleccionada = paisDetalle[0].Activities.filter((actividad)=>actividad.name===nameAct)
        
        return(
            <div className="contenedorPaisId">
                
                {/* ////////////////// Imagen Fondo //////////////////// */}
                <img src={img} className="imgFondoPais" />
                {/* ////////////////// Imagen Fondo //////////////////// */}

                {/* ////////////////// Propiedades Pais //////////////////// */}
                <h1 id="nombrePais"> {paisDetalle[0].name}</h1>
                <br/>
                <img src={paisDetalle[0].img} className="imgPais"></img>
                
                <div className="containerCountry">
                     
                        <h4>Continente <br/>{paisDetalle[0].continente}</h4>
                        <h4>Subregion <br/>{paisDetalle[0].subregion}</h4>
                        <h4>Capital <br/>{paisDetalle[0].capital}</h4>
       
                        <h4>ID<br/> {paisDetalle[0].id}</h4>
                        <h4>Área <br/>{paisDetalle[0].area} km2</h4>
                        <h4>Población <br/>{paisDetalle[0].poblacion}</h4>
                    
                </div>
                
                {/* ////////////////// Propiedades Pais Actividades //////////////////// */}
                {paisDetalle[0].Activities.length?
                (
                <div className="containerActivities">
                    <h3 id="act">Actividades</h3>
                    <div id="containerSelectionAct">
                    
                        <select onClick={mostrarActividad}>
                            {paisDetalle[0].Activities.map((act)=>{
                                return(
                                    
                                    <option key={act.name}>{act.name}</option>
                                    
                                )
                            })}

                        </select>
                    </div>
                    
                    
                    
                    <div id="containerEspecifications">

                        <h4>{actividadSeleccionada.map((act)=>{
                            return(
                                <div key={act.id} id="especifications">
                                    <h5>Nombre <br/> {act.name}</h5>
                                    <h5>Id <br/>{act.id}</h5>
                                    {act.dificult && <h5>Dificultad <br/> {act.dificult}</h5>}
                                    {act.duration && <h5>Duracion <br/> {act.duration}</h5>}
                                    <h5>Temporada <br/> {act.season}</h5>
                                </div>
                            )
                        })}
                            
                        </h4>
                    </div>




                     
                    

                </div>
                
                
                
                ):(<h4>Actividades: sin actividades</h4>)}
                {/* ////////////////// Propiedades Pais Actividades //////////////////// */}

                {/* ////////////////// Propiedades Pais //////////////////// */}
                
            </div>
        )
    };

    ////////////////////////////////////////////////////////

}

export default pais;