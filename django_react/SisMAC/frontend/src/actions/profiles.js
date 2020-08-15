import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from "./auth";

import { ADD_PROFILE } from './types';

//ADD PRFILE
export const addProfile = (profile) => (dispatch, getState) => {
    axios.post('/api/profiles/', profile, tokenConfig(getState))
    .then(res =>{
        dispatch(createMessage({ addProfile: "Profile Register" }));
        dispatch({
            type: ADD_PROFILE,
            payload: res.data
        });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};