import {GET_COUNTRIES, GET_DETAIL, SEARCH_COUNTRY,SEND_DATA,ERROR, CLEAN} from "./actions"


const initialState = {
    country : [],           // Almacenamiento de los paises buscados
    search: {},             // Almacenamiento de datos de 1 pais
    devolucion: ""          // Informacion de resolve/reject al crear actividad
}

const rootReducer = (state = initialState, action)=>{
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                country: action.payload
            };
    
        case SEARCH_COUNTRY:
            return{
                ...state,
                country: action.payload
            }

        case GET_DETAIL:
            return{
                ...state,
                search:  action.payload
            }
            
        case CLEAN:
            return{
                ...state,
                search:{}
            }
        
        case SEND_DATA:
            return{
                ...state,
                devolucion: action.payload
            }

        case ERROR:
            return{
                ...state,
                country:action.payload
            }

        default:
            return {...state}
                
    }
}

export default rootReducer;