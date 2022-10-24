import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getCountries, searchCountry} from "../redux/actions"

import "./css/home.css"
//AGREGAR UN MENSAJE DE ERROR CUANDO NO ENCUENTRE UN PAIS DETERMINADO
const home = (props)=>{

    const dispatch = useDispatch();
    const paises = useSelector((state)=>state.country)
    // si no tengo nada en el buscador => busca todos los paises, sino busca solo el pais encontrado
    // tengo que hacer un estado local y este debe relacionarse con el globlal para buscar informacion

    const [input,setInput]=useState("")
    const [filtro,setFiltro] = useState("")
    const [valor,setValor] = useState({
        valor1:0,
        valor2:9,
    })
    const [pagActual,setPagActual] = useState(1)
    

    //hacer otro estado, un filter,setFilter para poder cambiar las opciones del mapeo de los paises traidos
    // entonces dependiendo del valor que el filter posea es como se ordenarán los paises traidos
    // crear los botones que me permitan cambiar este nombre al hacerles click
    // poner en el array de dependencias el estado filter para que cuando cambie se pueda hacer useEffect

    
    useEffect( ()=>{
        if(input){
            dispatch(searchCountry(input))
        }
        else{
            dispatch(getCountries())
        }
        
        
    },[dispatch,input,filtro]) //agregar el estado filter
    
    const buscar= async(event)=>{
        event.preventDefault();
        // console.log(event.target.buscando.value)
        await setInput(event.target.buscando.value)
        await setPagActual(1);
        await setValor({
            valor1:0,
            valor2:9
        })
        
        
    }

    const filtrarPoblacionMenor = async(event)=>{
        event.preventDefault();
        await setFiltro("menorPoblacion")
    }
    const filtrarPoblacionMayor = async(event)=>{
        event.preventDefault();
        await setFiltro("mayorPoblacion")
    }
    const filtrarInverso = async(event)=>{
        event.preventDefault();
        await setFiltro("inverso")
    }
    const filtrarAlfabetico= async(event)=>{
        event.preventDefault();
        await setFiltro("alfabetico")
    }
    const filtrarContinente = async(event)=>{
        event.preventDefault();
        await setFiltro("continente")
    }
    const nextPage = async(event)=>{
        event.preventDefault();
        // console.log("long: ",paises.length)
        
        
        // console.log("valor pagina actual: ",pagActual)
        if(valor.valor2 < paises.length){
            await setValor({valor1:valor.valor1+9, valor2:valor.valor2+9})
            await setPagActual(pagActual +1)
        }
        if(paises.length<10){
            await setValor({valor1:0, valor2:9})
        }
        
    }
    const prevPage = async(event)=>{
        event.preventDefault();
        // console.log("valor pagina actual: ",pagActual)
        if(valor.valor1 !== 0){
            await setValor({valor1:valor.valor1-9, valor2:valor.valor2-9})
            await pagActual>0 && setPagActual(pagActual -1)
        }
        if(paises.length<10){
            await setValor({valor1:0, valor2:9})
        }
        
    }
    

    if(!paises){
        return(
        <div>
            <p>CARGANDOOOOOOOO...</p>
        </div>
        )
          
    }else{
        return (
            <div className="contenedorGrid">
                <div>
                    <form onSubmit={(e)=>buscar(e)}> 
                            <label>Navegador </label>
                            <input placeholder="pais" name="buscando" autoComplete="off"></input>
                            <button type="submit">Search</button>
                    </form>
                </div>
                <div>
                    <form onSubmit={(e)=>filtrarPoblacionMenor(e)}>
                        <button type="submit">Menor Población</button>
                    </form>
                </div>
                <div>
                    <form onSubmit={(e)=>filtrarPoblacionMayor(e)}>
                        <button type="submit">Mayor Población</button>
                    </form>
                </div>
                <div>
                    <form onSubmit={(e)=>filtrarInverso(e)}>
                        <button type="submit">Alfabético Inverso</button>
                    </form>
                </div>
                <div>
                    <form onSubmit={(e)=>filtrarAlfabetico(e)}>
                        <button type="submit">Alfabético</button>
                    </form>
                </div>
                <div>
                    <form onSubmit={(e)=>filtrarContinente(e)}>
                        <button type="submit">Continente</button>
                    </form>
                </div>

                <div>
                    <form onSubmit={(e)=>prevPage(e)}>
                        <button type="submit">PREV</button>
                    </form>
                </div>
                
                <div>
                    {pagActual}
                </div>

                <div>
                    <form onSubmit={(e)=>nextPage(e)}>
                        <button type="submit">NEXT</button>
                    </form>
                </div>
                

                


                <div className="contenedor">
                    
                    {paises.sort((a,b)=>{
                        if(filtro === "menorPoblacion"){
                            if(a.poblacion > b.poblacion){
                                return 1;
                            }
                            if(a.poblacion < b.poblacion){
                                return -1;
                            }
                        };
                        if(filtro === "mayorPoblacion"){
                            if(a.poblacion < b.poblacion){
                                return 1;
                            }
                            if(a.poblacion > b.poblacion){
                                return -1;
                            }
                        };

                        if(filtro=== "inverso"){
                            if(a.name < b.name){
                                return 1;
                            }
                            if(a.name > b.name){
                                return -1
                            }
                        };
                        if(filtro==="alfabetico"){
                            if(a.name > b.name){
                                return 1;
                            }
                            if(a.name < b.name){
                                return -1
                            }
                        };
                        if(filtro==="continente"){
                            if(a.continente > b.continente){
                                return 1
                            }
                            if(a.continente < b.continente){
                                return -1
                            }
                        };

                       
                    }).slice(valor.valor1,valor.valor2).map((pais)=>{
                     return(
                        
                        <div className="contenedorPais" key={pais.id}>
                            <Link to={`/pais/${pais.id}`} >
                                <h3>{pais.name}</h3>
                            </Link>
                            <img src={pais.img} className="imagen"></img>
                            <p>{pais.continente}</p>
                        </div>
                     )
                     
                    }
                    )}
                </div>
                
            </div>
        )
    }
    
    
}


export default home;