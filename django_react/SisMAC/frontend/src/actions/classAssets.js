import axios from 'axios';
import {GET_CLASS, DELETE_CLASS, ADD_CLASS} from './types';
import { createMessage, returnErrors } from './messages'

export const getClass = () => (dispatch) => {
    axios.get('/api/classes/')
    .then(res =>{
        dispatch({
            type: GET_CLASS,
            payload: res.data
        })
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const deleteClass = id => (dispatch) => {
    axios.delete(`/api/classes/${id}`)
    .then(res =>{
        dispatch(createMessage({deleteClass:"Delete Class"}));
        dispatch({
            type: DELETE_CLASS,
            payload: id
        })
    })
    .catch(err => console.log(err));
}

export const addClass = (type) => (dispatch) =>{
    axios.post('/api/classes/', type)
    .then(res =>{
        dispatch(createMessage({addClass: "Add Class"}));
        dispatch({
            type: ADD_CLASS,
            payload: res.data
        });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};