import {GET_COUNTRIES, GET_DETAIL, SEARCH_COUNTRY,SEND_DATA, CLEAN} from "./actions"


const initialState = {
    country : [],
    search: {},
    devolucion: ""
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

        default:
            return {...state}
                
    }
}

export default rootReducer;