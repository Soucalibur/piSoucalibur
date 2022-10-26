import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getCountries, searchCountry} from "../redux/actions"

import img from "./css/img/Home_img/Continente.jpg"
import "./css/home.css"



const home = (props)=>{

    // Hooks ///////////////////////////////////////////////////

    const dispatch = useDispatch();
    const paises = useSelector((state)=>state.country)

    ////////////////////////////////////////////////////////////
    
    // Estados locales /////////////////////////////////////////

    const [input,setInput]=useState("")         // Para el buscador
    const [filtro,setFiltro] = useState("")     // Para el filtro
    const [valor,setValor] = useState({         // Para el paginado (elementos visualizados)
        primerElemento:0,
        ultimoElemento:9,
    })
    const [pagActual,setPagActual] = useState(1)// Para el paginado (numero pagina actual)
    
    ////////////////////////////////////////////////////////////

    // Ciclo de vida ///////////////////////////////////////////

    useEffect( ()=>{
        dispatch(getCountries())
        
    },[dispatch])

    ////////////////////////////////////////////////////////////

    // Búsqueda ////////////////////////////////////////////////

    const buscar= (event)=>{
        event.preventDefault();
        
        dispatch(searchCountry(input))
        setInput("")
        setPagActual(1);
        setValor({
            primerElemento:0,
            ultimoElemento:9
        })
   
    }

    const cambiarInput = (event)=>{
        event.preventDefault()
        setInput(event.target.value)
    }

    ////////////////////////////////////////////////////////////

    // Filtros /////////////////////////////////////////////////

    const filtrarPoblacionMenor = (event)=>{
        event.preventDefault();
        setFiltro("menorPoblacion")
    }
    const filtrarPoblacionMayor = (event)=>{
        event.preventDefault();
        setFiltro("mayorPoblacion")
    }
    const filtrarInverso = (event)=>{
        event.preventDefault();
        setFiltro("inverso")
    }
    const filtrarAlfabetico= (event)=>{
        event.preventDefault();
        setFiltro("alfabetico")
    }
    const filtrarContinente = (event)=>{
        event.preventDefault();
        setFiltro("continente")
    }
    ////////////////////////////////////////////////////////////
    
    // Paginado ////////////////////////////////////////////////

    const nextPage = (event)=>{
        event.preventDefault();
        
        if(valor.ultimoElemento < paises.length && pagActual === 1){
            setValor({primerElemento:valor.primerElemento+9, ultimoElemento:valor.ultimoElemento+10})
            setPagActual(pagActual +1) 
        }

        if(valor.ultimoElemento < paises.length && pagActual !== 1){
            setValor({primerElemento:valor.primerElemento+10, ultimoElemento:valor.ultimoElemento+10})
            setPagActual(pagActual +1) 
        }
        
    }

    const prevPage = (event)=>{
        event.preventDefault();
        
        if(valor.primerElemento !== 0 && pagActual === 2){
            setValor({primerElemento:valor.primerElemento-9, ultimoElemento:valor.ultimoElemento-10})
            pagActual>0 && setPagActual(pagActual -1)
        }

        if(valor.primerElemento !== 0 && pagActual > 2 ){
            setValor({primerElemento:valor.primerElemento-10, ultimoElemento:valor.ultimoElemento-10})
            pagActual>0 && setPagActual(pagActual -1) 
        }
    
    }
    ///////////////////////////////////////////////////////////
    
    // Renderizado ////////////////////////////////////////////

    if(!paises.length){
        return(
        <div>
            <p>CARGANDOOOOOOOO...</p>
        </div>
        )
          
    }else{
        return (
            <div className="contenedorGrid">
                
                <div className="contenedorFiltros">
                    
                    {/* ///////////////// Busqueda //////////////////////// */}
                    <div id="navegador">
                        <form onSubmit={(e)=>buscar(e)}> 
                                
                                <input placeholder="Buscar país..." autoComplete="off" value={input} onChange={cambiarInput} id="input"></input>
                                <button type="submit" className="boton">Search</button>
                                
                        </form>
                    </div>
                    {/* ///////////////// Busqueda //////////////////////// */}

                    {/* ///////////////// Filtros ///////////////////////// */}
                    <div id="filtros">

                        <form onSubmit={(e)=>filtrarPoblacionMenor(e)}>
                            <button type="submit" className="boton">Menor Población</button>
                        </form>
                    
                        <form onSubmit={(e)=>filtrarPoblacionMayor(e)}>
                            <button type="submit" className="boton">Mayor Población</button>
                        </form>
                    
                        <form onSubmit={(e)=>filtrarInverso(e)}>
                            <button type="submit" className="boton">Alfabético Inverso</button>
                        </form>
                    
                        <form onSubmit={(e)=>filtrarAlfabetico(e)}>
                            <button type="submit" className="boton">Alfabético</button>
                        </form>
                    
                    
                        <form onSubmit={(e)=>filtrarContinente(e)}>
                            <button type="submit" className="boton">Continente</button>
                        </form>

                    </div>
                    {/* ///////////////// Filtros ///////////////////////// */}

                </div>
                
                    {/* ///////////////// Paginado //////////////////////// */}
                    <div className="contenedorPaginado">
                        <form onSubmit={(e)=>prevPage(e)}>
                            <button type="submit" className="boton">PREV</button>
                        </form>
                    
                        {pagActual}
                    
                        <form onSubmit={(e)=>nextPage(e)}>
                            <button type="submit" className="boton">NEXT</button>
                        </form>
                    </div>
                    {/* ///////////////// Paginado //////////////////////// */}
                


                <div className="contenedor">
                    
                    {/* ///////////////// Paises ////////////////////////// */}
                    {Array.isArray(paises)? paises.sort((a,b)=>{
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

                       
                    }).slice(valor.primerElemento,valor.ultimoElemento).map((pais)=>{
                     return(
                        
                        <div className="contenedorPais" key={pais.id}>
                            <div className="nombrePais">
                            
                                <Link to={`/home/pais/${pais.id}`} >
                                    <h3>{pais.name}</h3>
                                </Link>
                                
                            </div>

                            <img src={pais.img} className="imagenPais"></img>

                            <p className="continentePais">{pais.continente}</p>
                            
                        </div>  

                     )}) : <p>No se encontró el país buscado</p>
                
                }
                    {/* ///////////////// Paises ////////////////////////// */}
                    
                </div>

                {/* ///////////////////// Imagen Fondo //////////////////// */}
                <img src={img} alt="fondo" className="img" />
                {/* ///////////////////// Imagen Fondo //////////////////// */}
                
            </div>
        )
    }
    
    
}

    ////////////////////////////////////////////////////////////

export default home;