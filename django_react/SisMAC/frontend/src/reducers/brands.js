import { ADD_BRANDS, DELETE_BRANDS, GET_BRANDS } from "../actions/types";

const initialState = {
    brands: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BRANDS:
            return {
                ...state,
                brands: action.payload
            };
        case DELETE_BRANDS:
            return {
                ...state,
                brands: state.brands.filter(brand => brand.id !== action.payload)
            };
        case ADD_BRANDS:
            return {
                ...state,
                brands: [...state.brands, action.payload]
            }
        
        default:
            return state;
    }
}