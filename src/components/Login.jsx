import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Home from './Home.jsx';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId : "TEST",
            pwd : "pwd"
        };
        this.validateLogin = this.validateLogin.bind(this);
    }

    validateLogin(req){
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body:JSON.stringify({
                userId:this.state.userId,
                pwd:this.state.pwd
            })
        })
        .then(res => res.json())
        .then(res => {
            ReactDOM.render(<Home data={res}/>, document.getElementById("root"));
        })
    }
    render(){
        return (
            <form id="loginForm" className="form" action="/login" method="post">
                <input id="userId" name="userId" className="userId" value={this.state.userId}/>
                <input id="pwd" name="pwd" className="pwd" value={this.state.pwd}/>
                <input id="submit" className="submit" type="button" value="submit" onClick={this.validateLogin}/>
            </form>
        )
    }
}