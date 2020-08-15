import {combineReducers} from 'redux';
import assets from './assets';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import profiles from './profiles';
import brands from "./brands";
import types from "./types";
import classes from "./classes";
import resources from "./resources";

export default combineReducers({
    assets,
    errors,
    messages,
    auth,
    profiles,
    brands,
    types,
    classes,
    resources
});
