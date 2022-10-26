import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {sendData,getCountries } from "../redux/actions"

import "./css/activity.css"
import img from "./css/img/Activity_img/hiker-gbe0736e13_1920.jpg"


const validar = (input)=>{
    let errors = {}
    
    // Error name ////////////////////////////////////////////
    
    if(!input.name){
        errors.name = "Complete un nombre"
    }

    //////////////////////////////////////////////////////////

    // Error dificult ////////////////////////////////////////
    
    if(!input.dificult){
        errors.dificult = "Elija el nivel entre 1-5"
    }
    
    else if(typeof parseInt(input.dificult) !== "number"){
        errors.dificult = "Debe escribir solo numeros enteros"
    }
    else if(input.dificult<1 || input.dificult>5){
        errors.dificult = "Debe escribir un numero del 1 al 5"
    }

    //////////////////////////////////////////////////////////

    // Error CountryId ///////////////////////////////////////

    if(!input.CountryId.length){
        errors.CountryId = "Introduzca un ID válido"
    }

    //////////////////////////////////////////////////////////
    
    // Habilitar/Deshabilitar boton //////////////////////////
    
    const boton = document.getElementById("botonEnviar")
    
    if(Object.entries(errors).length){
        boton.disabled = true
    }
    else{
        boton.disabled = false
    }

    //////////////////////////////////////////////////////////

    return errors
}


const activity = (props)=>{

    // Estados locales //////////////////////////////////////

    const [datos,setDatos] = useState({
        name: "",
        dificult: 1,
        duration: "",
        season: "",
        CountryId:[]
    })

    const [error,setError]= useState({
        name: "",
        dificult: "",
        duration: "",
        season: "",
        CountryId:[]
    })

    //////////////////////////////////////////////////////////
    
    // Hooks /////////////////////////////////////////////////

    const dispatch = useDispatch();
    const history = useHistory();
    const paises = useSelector((state)=>state.country)
    
    //////////////////////////////////////////////////////////

    // Ciclo de vida /////////////////////////////////////////

    useEffect(()=>{
        dispatch(getCountries())
    })
    
    //////////////////////////////////////////////////////////

    // Introducir/Validar datos //////////////////////////////

    const introducirDatos = (event)=>{
        // event.preventDefault();
        const value = event.target.value;
        const property = event.target.name;
        setDatos({...datos,[property]:value});
        setError(validar({...datos,[property]:value}))

    }

    //////////////////////////////////////////////////////////

    // Enviar datos //////////////////////////////////////////
    
    const postDatos = async (event)=>{
        event.preventDefault();
        await dispatch(sendData(datos))
        history.push("/enviado")
       
    }

    //////////////////////////////////////////////////////////

    // Seleccion ID //////////////////////////////////////////    

    const seleccionar =async(event)=>{
        event.preventDefault()
        const paisId = event.target.value.split(": ")[1];
        
        
        if (!datos.CountryId.includes(paisId)){
            setDatos({...datos,CountryId: [...datos.CountryId, paisId]})
            
            setError(validar({...datos,CountryId:event.target.value}))
            // Error solucionado:
            // anteriormente no me permitia realizar comprobacion del error porque no tomaba el cambio el input
            // del CountryId, por lo que setError(validar()) arregló la comprobacion
        }   
     
    }

    const borrarContenido = (event)=>{
        event.preventDefault()
        setDatos({...datos, CountryId:[]})
        setError(validar({...datos,CountryId:event.target.value}))
        
    }

    //////////////////////////////////////////////////////////
    

    return(

        <div className="contenedorActividad">
            
            {/*  /////////////////// Imagen fondo ///////////////////// */}
            <img src={img} className="imgAct" />
            {/*  /////////////////// Imagen fondo ///////////////////// */}
            

            <div className="contenedorForm">
                
                <h3>Crear actividad</h3>

                {/*  /////////////////// Formulario ///////////////////// */}
                <form onSubmit={(e)=>postDatos(e)}> 

                    <div>
                        <label htmlFor="name">Nombre </label>
                        <input placeholder="Name" name="name" value={datos.name} onChange={introducirDatos} autoComplete="off" className="input"></input>
                        {error.name && <p>{error.name}</p>}
                    </div>  

                    <div>
                        <label htmlFor="dificult">Dificultad </label>
                        <input type="number" min="1" max="5" placeholder="1-5" name="dificult" value={datos.dificult} onChange={introducirDatos}  autoComplete="off" className="input"></input>
                        {error.dificult && <p>{error.dificult}</p>}
                    </div>

                    <div>
                        <label htmlFor="duration">Duración </label>
                        <input placeholder="Tiempo" name="duration" value={datos.duration} onChange={introducirDatos}  autoComplete="off" className="input"></input>
                    </div>

                    <div>
                        <label htmlFor="season">Temporada </label>
                        <input placeholder="otoño,invierno,primavera,verano" name="season" value={datos.season} onChange={introducirDatos}  autoComplete="off" className="input"></input>
                    </div>
                    
                    <div>
                        <label htmlFor="CountryId">Pais ID</label>
                        <input name="CountryId" value={datos.CountryId} onChange={introducirDatos} disabled className="input"></input>
                        {error.CountryId && <p>{error.CountryId}</p>}
                    </div>

                    {/*  /////////////////// Boton borrar ID ///////////////////// */}
                    <div>
                        <button onClick={borrarContenido} className="botonActividad">Borrar</button>
                    </div>
                    {/*  /////////////////// Boton borrar ID ///////////////////// */}

                    {/*  /////////////////// Lista Paises/ID ///////////////////// */}
                    <div>
                        <p>Seleccione su PaisID aquí</p>

                        <select onChange={seleccionar} className="input">
                            {paises.sort((a,b)=>{
                                if(a.name > b.name){
                                    return 1;
                                }
                                if(a.name < b.name){
                                    return -1
                                }
                                }).map((pais)=>{
                                    
                                    return(
                                        <option  key={pais.id}> {pais.name}: {pais.id}</option>    
                                    )
                                    
                                })
                            }
                        </select>

                    </div>
                    {/*  /////////////////// Lista Paises/ID ///////////////////// */}

                    {/*  /////////////////// Boton enviar formulario ///////////////////// */}
                    <div>
                        <button id="botonEnviar" type="submit" className="botonActividad" disabled>Enviar</button>
                        
                    </div> 
                    {/*  /////////////////// Boton enviar formulario ///////////////////// */}
                    
                    {/*  /////////////////// Formulario ///////////////////// */}

                </form>

            </div>

        </div>

    )
}
export default activity