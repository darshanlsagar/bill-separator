import React, {Components} from 'react';
import Home from '../components/Home';

export default class LoginAction extends Components {
    validateLogin(req){
        fetch("/login")
        .then(res => {
            res.status
        })
    }
}