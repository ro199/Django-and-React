import { ADD_RESOURCE, DELETE_RESOURCE, GET_RESOURCE  } from "../actions/types";

const initialState = {
    resources: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RESOURCE:
            return{
                ...state,
                resources: action.payload
            };
        case DELETE_RESOURCE:
            return{
                ...state,
                resources: state.resources.filter(resouce => resouce.id !== action.payload)
            };
        case ADD_RESOURCE:
            return{
                ...state,
                resources: [...state.resources, action.payload]
            };
        default:
            return state;
    }
    
}