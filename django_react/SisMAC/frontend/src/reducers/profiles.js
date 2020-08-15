import { ADD_PROFILE } from '../actions/types';

const initialState = {
    profiles: [],
    isRegister: null
}

export default function(state = initialState, action){
    switch (action.type) {
        case ADD_PROFILE:
            return {
                ...state,
                profiles: [...state.profiles, action.payload],
                isRegister: true         
            };
    
        default:
            return state;
    }
}