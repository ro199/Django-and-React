import { GET_ASSETS, DELETE_ASSET, ADD_ASSET } from "../actions/types.js";

const initialState = {
    assets: []
}

export default function( state = initialState, action) {
    switch(action.type){
        case GET_ASSETS:
            return {
                ...state,
                assets: action.payload
            };
        case DELETE_ASSET:
            return {
                ...state,
                assets: state.assets.filter(asset => asset.id !== action.payload)
            };
        case ADD_ASSET:
            return{
                ...state,
                assets: [...state.assets, action.payload]
            };

        default:
            return state;
    }

}