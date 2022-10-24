import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getDetail, clean} from "../redux/actions"

const pais = (props)=>{


    const paisId = props.match.params.id;
    const dispatch = useDispatch();
    const paisDetalle = useSelector((state)=>state.search)

    useEffect(()=>{
        dispatch(getDetail(paisId))
        return(
            dispatch(clean())
        )

    },[dispatch])

    // console.log("detalle: ",paisDetalle)

    if(!paisDetalle.length){
        return(
            <div>
                <h1>CARGANDO...</h1>
            </div>
        )
    }else{
        return(
            <div>
                <h2>PAIS</h2>
                <h1>Nombre: {paisDetalle[0].name}</h1>
                <h2>ID: {paisDetalle[0].id}</h2>
                <img src={paisDetalle[0].img}></img>
                <h4>Continente: {paisDetalle[0].continente}</h4>
                <h4>Subregion: {paisDetalle[0].subregion}</h4>
                <h4>Capital: {paisDetalle[0].capital}</h4>
                <h4>Área: {paisDetalle[0].area} km2</h4>
                <h4>Población: {paisDetalle[0].poblacion}</h4>
                
                {paisDetalle[0].Activities.length?
                (<h4>Actividades: {paisDetalle[0].Activities.map((actividad)=>{
                return(
                        <div key = {actividad.id}>
                            {actividad.name && <h5>Nombre Act=> {actividad.name}</h5>}
                            {actividad.id && <h5>Id Act=> {actividad.id}</h5>}
                            {actividad.dificult && <h5>Dificultad Act=> {actividad.dificult}</h5>}
                            {actividad.duration && <h5>Duracion Act=> {actividad.duration}</h5>}
                            {actividad.season && <h5>Temporada Act=> {actividad.season}</h5>}
                            <hr/>
                        </div>

                    )
                }
                   
                )}
                </h4>):(<h4>Actividades: sin actividades</h4>)}
                
                
            </div>
        )
    };

}

export default pais;