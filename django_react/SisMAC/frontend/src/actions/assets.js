import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from "./auth";

import {GET_ASSETS, DELETE_ASSET, ADD_ASSET, GET_ERRORS} from './types';

//GET ASSETS
export const getAssets = () => (dispatch, getState) => {
    axios.get('/api/assets/', tokenConfig(getState))
    .then(res =>{
        dispatch({
            type: GET_ASSETS,
            payload: res.data
        });

    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//DELETE ASSET
export const deleteAsset = id => (dispatch, getState) => {
    axios.delete(`/api/assets/${id}/`, tokenConfig(getState))
    .then(res =>{
        dispatch(createMessage({ deleteAsset: "Asset Delete" }));
        dispatch({
            type: DELETE_ASSET,
            payload: id
        });
    })
    .catch(err => console.log(err));
};

//ADD ASSET
export const addAsset = (asset) => (dispatch, getState) => {
    axios.post('/api/assets/', asset, tokenConfig(getState))
    .then(res =>{
        dispatch(createMessage({ addAsset: "Asset Added" }));
        dispatch({
            type: ADD_ASSET,
            payload: res.data
        });
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};