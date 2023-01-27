import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getCountries, searchCountry, searchCountryByContinent, searchActivity} from "../redux/actions"

import img from "./css/img/Home_img/Continente.jpg"
import "./css/home.css"



const home = (props)=>{

    // Hooks //////////////////////////////////////////////////

    const dispatch = useDispatch();
    const paises = useSelector((state)=>state.country)

    ///////////////////////////////////////////////////////////
    
    // Estados locales ////////////////////////////////////////

    //const [cargado, setCargado] = useState(0)// Para cargar solo 1 vez las actividades y no actualizarse

    const [input,setInput]=useState("")         // Para el buscador
    const [filtro,setFiltro] = useState("")     // Para el filtro
    const [valor,setValor] = useState({         // Para el paginado (elementos visualizados)
        primerElemento:0,
        ultimoElemento:9,
    })
    const [pagActual,setPagActual] = useState(1)// Para el paginado (numero pagina actual)
    const [accion,setAccion]= useState([])

    ////////////////////////////////////////////////////////////

    // Ciclo de vida ///////////////////////////////////////////

    useEffect(()=>{
        
        dispatch(getCountries())
        
    },[dispatch])
    
    ////////////////////////////////////////////////////////////

    // Búsqueda ////////////////////////////////////////////////

    const buscar= (event)=>{
        event.preventDefault();
        
        dispatch(searchCountry(input))
        setInput("")
        primeraPagina()
   
    }

    const cambiarInput = (event)=>{
        event.preventDefault()
        setInput(event.target.value)
    }

    ////////////////////////////////////////////////////////////

    // Filtros /////////////////////////////////////////////////

    const elegirFiltro = (event)=>{
        event.preventDefault()
        const value = event.target.value;
        setFiltro(value)
        // if(value === "sinFiltro"){
        //     dispatch(getCountries())
        // }
    }
    
    const filtrarPorContinente = (event)=>{
        event.preventDefault();
        dispatch(searchCountryByContinent(event.target.value))
        primeraPagina()
    }
    
    // Filtrado de actividades ////////////////////////////////
    
    const obtenerActividades = (event)=>{
        
        //if(cargado === 0){
            const paisesConActividad = paises.filter((pais)=> pais.Activities.length>0) // Array de paises que posean actividades 
            const actividadGuardada = paisesConActividad.map((pais)=>pais.Activities)   // Array de actividades
        
            var actividadesSinRepetir = []
            actividadGuardada.map((elemento)=> {                                        // Array de nombres de actividades no repetidas
               
                elemento.map((subElemento)=>{
                    
                    if(!actividadesSinRepetir.includes(subElemento.name))
                    actividadesSinRepetir.push(subElemento.name)
                })
            })
            setAccion(actividadesSinRepetir)                                            // Introducir ultimo array en estado local
            //setCargado(1)                                                            // Para cargar solo 1 vez las actividades
        //}
                                                   
    }
    //paises.length && obtenerActividades()                                               // Llamado de la funcion solo cuando se obtengan los paises

    const filtrarActividad = (event)=>{
        event.preventDefault();
        dispatch(searchActivity(event.target.value))
        primeraPagina()

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

    const primeraPagina = (event)=>{
        setPagActual(1);
        setValor({
            primerElemento:0,
            ultimoElemento:9
        })
    }

    ///////////////////////////////////////////////////////////
    
    // Renderizado ////////////////////////////////////////////

        return (
            
            <div className="contenedorGrid">
                
                <div className="contenedorFiltros">
                    <h4 id="filtroBusqueda">Filtros de Búsqueda</h4>
                    <h4 id="filtroOrdenamiento">Filtros de Ordenamiento</h4>
                    {/* ///////////////// Busqueda //////////////////////// */}
                    <div id="navegador">
                        <div>
                            <form onSubmit={(e)=>buscar(e)}> 
                                    
                                    <input placeholder="Buscar país..." autoComplete="off" value={input} onChange={cambiarInput} id="input"></input>
                                    <button type="submit" className="boton">Search</button>
                                    
                            </form>
                        </div>

                        <div>
                            <select onChange={filtrarPorContinente} className="opcion">
                                <option className="opciones" value="">Filtrar por continente...</option>
                                <option className="opciones">Africa</option>
                                <option className="opciones">Americas</option>
                                <option className="opciones">Antarctic</option>
                                <option className="opciones">Asia</option>
                                <option className="opciones">Europe</option>
                                <option className="opciones">Oceania</option>
                                
                            </select>
                        </div>

                        <div>
                            <select onChange={filtrarActividad} onClick={obtenerActividades} className="opcion">
                                
                                <option className="opciones"  value="">Filtrar por actividad...</option>
                                
                                {accion.sort((a,b)=>{
                                    if(a > b){
                                        return 1;
                                    }
                                    if(a < b){
                                        return -1
                                    }
                                    }).map((actividad)=>{
                                        
                                        
                                        return(
                                            
                                            <option className="opciones" key={actividad} >{actividad}</option>    
                                        )
                                        
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    {/* ///////////////// Busqueda //////////////////////// */}

                    {/* ///////////////// Filtros ///////////////////////// */}
                    <div id="filtros">
                        
                        <select onChange={elegirFiltro} className="opcion">

                            <option className="opciones" value=""> Seleccionar filtro...</option>
                            <option className="opciones" value="alfabetico">Alfabético</option>
                            <option className="opciones" value="inverso">Alfabético Inverso</option>
                            <option className="opciones" value="menorPoblacion">Menor Población</option>
                            <option className="opciones" value="mayorPoblacion">Mayor Población</option>
                            {/* <option className="opciones"  value="sinFiltro" >Sin filtro</option> */}
                        </select>
                        

                        

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
                    {paises.length? paises.sort((a,b)=>{
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


    ////////////////////////////////////////////////////////////

export default home;