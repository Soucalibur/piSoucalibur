export const GET_COUNTRIES = "GET_COUNTRIES";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY"
export const GET_DETAIL = "GET_DETAIL"
export const CLEAN = "CLEAN"
export const SEND_DATA = "SEND_DATA"
export const ERROR = "ERROR"

// Traer todos los paises //////////////////////////////////////

export const getCountries = ()=>{
    return function(dispatch){
        fetch("http://localhost:3001/countries")
        .then((response)=>response.json())
        .then((data)=>dispatch({type:GET_COUNTRIES, payload: data}))
    }
}

////////////////////////////////////////////////////////////////

// Traer paises por nombre /////////////////////////////////////

export const searchCountry = (name)=>{
    return function(dispatch){
        fetch(`http://localhost:3001/countries?name=${name}`)
        .then((response)=>response.json())
        .then((data)=> dispatch({type:SEARCH_COUNTRY,payload:data}))
        .catch((data)=>dispatch({type: ERROR, payload:data}))
    }
}

////////////////////////////////////////////////////////////////

// Traer datos de pais por ID //////////////////////////////////

export const getDetail = (id)=>{
    return function(dispatch){
        fetch(`http://localhost:3001/countries/${id}`)
        .then((response)=>response.json())
        .then((data)=> dispatch({type:GET_DETAIL, payload:data}))
    }
}

////////////////////////////////////////////////////////////////

// Crear actividad /////////////////////////////////////////////

export const sendData = (inf)=>{
    return function(dispatch){
        fetch(`http://localhost:3001/activities`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(inf),
        })
        .then((response)=>response.json())
        .then((data)=>dispatch({type:SEND_DATA,payload:"datos enviados"}))
        .catch((data)=> dispatch({type:SEND_DATA, payload: "datos no enviados"}))
    }
}

////////////////////////////////////////////////////////////////

// Limpiar registro de pais buscado ////////////////////////////

export const clean = ()=>{
    return function(dispatch){ 
        dispatch({type:CLEAN})
    }
}

////////////////////////////////////////////////////////////////