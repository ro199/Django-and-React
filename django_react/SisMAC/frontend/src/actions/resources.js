import axios from "axios";
import { createMessage, returnErrors } from "./messages";

import { ADD_RESOURCE, DELETE_RESOURCE, GET_RESOURCE } from "./types";

export const getResource = () => (dispatch) =>{
    axios.get('/api/recources/')
    .then(res => {
        dispatch({
            type: GET_RESOURCE,
            payload: res.data
        });
    })
    .catch(err => dispatch(err.response.data, err.response.status))
}

export const deleteResource = id => (dispatch) =>{
    axios.delete(`/api/recources/${id}/`)
    .then(res => {
        dispatch(createMessage({deleteResource: "Delete Resource"}));
        dispatch({
            type: DELETE_RESOURCE,
            payload: id
        });
    })
    .catch(err => console.log(err));
};

export const addResource = (resource) => (dispatch) => {
    axios.post('/api/recources/', resource)
    .then(res => {
        dispatch(createMessage({addResource: "Add Resource"}));
        dispatch({
            type: ADD_RESOURCE,
            payload: res.data
        });
    })
    .catch(err => dispatch(returnErrors(err.response.data,err.response.status)));
};