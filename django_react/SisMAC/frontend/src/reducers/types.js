import {ADD_TYPE, GET_TYPE, DELETE_TYPE} from '../actions/types'

const initialStae = {
    types: []
}

export default function (state = initialStae, action) {
    switch (action.type) {
        case GET_TYPE:
            return {
                ...state,
                types: action.payload
            }
        case DELETE_TYPE:
            return {
                ...state,
                types: state.types.filter(type => type.id !== action.payload)
            }
        case ADD_TYPE:
            return {
                ...state,
                types: [...state.types, action.payload]
            }
        default:
            return state;
    }
}