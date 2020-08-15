import { ADD_CLASS, GET_CLASS, DELETE_CLASS } from "../actions/types";

const initialState = {
    classes: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CLASS:
            return {
                ...state,
                classes: action.payload
            }
        case DELETE_CLASS:
            return {
                ...state,
                classes: state.classes.filter(classs => classs.id !== action.payload)
            }
        case ADD_CLASS:
            return {
                ...state,
                classes: [...state.classes, action.payload]
            }
        default:
            return state;
    }
}
