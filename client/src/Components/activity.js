import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory  } from "react-router-dom";

import {sendData,getCountries } from "../redux/actions"
import "./css/activity.css"

const validar = (input)=>{
    let errors = {}
    
    
    if(!input.name){
        errors.name = "Complete un nombre"
    }

    if(!input.dificult){
        errors.dificult = "Elija el nivel entre 1-5"
    }
    
    else if(typeof parseInt(input.dificult) !== "number"){
        errors.dificult = "Debe escribir solo numeros enteros"
    }
    else if(input.dificult<1 || input.dificult>5){
        errors.dificult = "Debe escribir un numero del 1 al 5"
    }

    if(!input.CountryId.length){
        errors.CountryId = "Introduzca un ID válido"
    }
    
    
    // console.log("ERRORS: ",errors)
    // console.log("longitud:",errors.length)
    const boton = document.getElementById("botonEnviar")
    
    if(Object.entries(errors).length){
        boton.disabled = true
    }
    else{
        boton.disabled = false
    }
    return errors
}


const activity = (props)=>{

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

    
    

    const dispatch = useDispatch();
    const history = useHistory();
    const devolucion = useSelector((state)=>state.devolucion)
    const paises = useSelector((state)=>state.country)

    //FRONT, LIMPIAR LOS DATOS UNA VEZ MANDADOS Y DAR A CONCOER QUE SE REALIZO SACTIZFACTORIAMENTE

    //Está puesto debido a que si recargo la pagina en actividades mi estado globlal con la informacion
    // de los paises estará vacia, por lo que al agregar este if se soluciona el problema
    if(!paises.length){
        dispatch(getCountries())
    }
    // console.log(paises)


    const enviarDatos = (event)=>{
        // event.preventDefault();
        const value = event.target.value;
        const property = event.target.name;
        setDatos({...datos,[property]:value});
        setError(validar({...datos,[property]:value}))

    }

    const postDatos = async (event)=>{
        event.preventDefault();
        await dispatch(sendData(datos))
        history.push("/enviado")
       
    }
    

    const seleccionar =async(event)=>{
        event.preventDefault()
        const paisId = event.target.value.split(": ")[1];
        
        
        if (!datos.CountryId.includes(paisId)){
            setDatos({...datos,CountryId: [...datos.CountryId, paisId]})
            
            setError(validar({...datos,CountryId:event.target.value}))//Error solucionado:
            // anteriormente no me permitia realizar comprobacion del error porque no tomaba el cambio el input
            // del CountryId, por lo que setError(validar()) arregló la comprobacion
        }   
     
    }
    const borrarContenido = (event)=>{
        setDatos({...datos, CountryId:[]})
        setError(validar({...datos,CountryId:event.target.value}))
        setMostrar(false)
    }

    const nuevaActividad = (event)=>{
        setDatos({...datos, 
        name: "",
        dificult: 1,
        duration: "",
        season: "",
        CountryId:[]})
        setError(validar({...datos,
        name: "",
        dificult: 1,
        duration: "",
        season: "",
        CountryId:[]}))
        
        
    }


    // console.log("devolucion: ",devolucion)
    return(
        <div>
            <h1>Actividad</h1>
            <h3>Crear actividad</h3>

            <form onSubmit={(e)=>postDatos(e)}> 

                <div>
                    <label htmlFor="name">Nombre </label>
                    <input placeholder="Name" name="name" value={datos.name} onChange={enviarDatos} autoComplete="off"></input>
                    {error.name && <p>{error.name}</p>}
                </div>  

                <div>
                    <label htmlFor="dificult">Dificultad </label>
                    <input type="number" min="1" max="5" placeholder="1-5" name="dificult" value={datos.dificult} onChange={enviarDatos}  autoComplete="off"></input>
                    {error.dificult && <p>{error.dificult}</p>}
                </div>

                <div>
                    <label htmlFor="duration">Duración </label>
                    <input placeholder="Tiempo" name="duration" value={datos.duration} onChange={enviarDatos}  autoComplete="off"></input>
                </div>

                <div>
                    <label htmlFor="season">Temporada </label>
                    <input placeholder="otoño,invierno,primavera,verano" name="season" value={datos.season} onChange={enviarDatos}  autoComplete="off"></input>
                </div>
                
                <div>
                    <label htmlFor="CountryId">Pais ID</label>
                    <input name="CountryId" value={datos.CountryId} onChange={enviarDatos} disabled></input>
                    {error.CountryId && <p>{error.CountryId}</p>}
                </div>

                <div>
                    <button onClick={borrarContenido}>Borrar</button>
                </div>

                <div>
                    <select onChange={seleccionar}>
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
                

                <div>
                    <button id="botonEnviar" type="submit"  disabled>Enviar</button>
                    
                </div> 

                
                

            </form>

            

        </div>

    )
}
export default activity