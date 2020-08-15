import axios from "axios";
import { createMessage, returnErrors } from './messages';

import { ADD_BRANDS, GET_BRANDS, DELETE_BRANDS } from './types';

export const getBrands = () => (dispatch) =>{
    axios.get('/api/brands/')
    .then(res =>{
        dispatch({
            type: GET_BRANDS,
            payload: res.data
        });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};

export const deleteBrands = (id) => (dispatch) =>{
    axios.delete(`/api/brands/${id}/`)
    .then(res => {
        dispatch(createMessage({deleteBrands: "Brands Delete"}));
        dispatch({
            type: DELETE_BRANDS,
            payload: id
        });
    })
    .catch(err => console.log(err));
};

export const addBrands = (brand) =>(dispatch) => {
    axios.post('/api/brands/', brand)
    .then(res => {
        dispatch(createMessage({addBrands: "Brands Add"}));
        dispatch({
            type: ADD_BRANDS,
            payload: res.data
        });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}
