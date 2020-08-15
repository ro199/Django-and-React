import React, { Fragment } from 'react';
import Form from './Form';
import Assets from './Assets';

export default function Dashboard(){
    return(
        <Fragment> 
            <Form />
            <Assets />
        </Fragment>
    )
}