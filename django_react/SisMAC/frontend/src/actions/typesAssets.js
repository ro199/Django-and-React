import axios from "axios";
import { ADD_TYPE, GET_TYPE, DELETE_TYPE } from "./types";

import {createMessage, returnErrors} from "./messages";
import { Redirect } from "react-router-dom";

export const getType = () => (dispatch) => {
    axios.get('/api/types/')
    .then(res=>{
        dispatch({
            type: GET_TYPE,
            payload: res.data
        });
    })
    .catch(err => dispatch(createMessage(err.response.data, err.response.status)));
};

export const deleteType = (id) => (dispatch) => {
    axios.delete(`/api/types/${id}`)
    .then(res =>{
        dispatch(createMessage({deleteType: "Type Delete"}));
        dispatch({
            type: DELETE_TYPE,
            payload: id
        });
    })
    .catch(err => dispatch(createMessage(err.response.data, err.response.status)));
};

export const addType = (type) => (dispatch) => {
    axios.post('/api/types/',type)
    .then(res => {
        dispatch(createMessage({addType: "Type Add"}));
        dispatch({
            type: ADD_TYPE,
            payload: res.data
        });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}