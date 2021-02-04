import React from 'react'
import UserProfile from './userInfo';
import { Redirect } from "react-router-dom";
import $ from 'jquery'
import back from './back.jpg'
var axios = require('axios');

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.loggedIn = UserProfile.getName() != null && UserProfile.getName() != "";
        this.state = {
            username: "",
            password: "",
            error: "",
            redirect: false
        }
    }
    myAlertBottom(className, msg, time) {

        $("#alert-message").text(msg);
        $(".myAlert-bottom").addClass(className);

        $(".myAlert-bottom").slideDown();
        setTimeout(function () {
            $(".myAlert-bottom").slideUp();
        }, time);
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/dashboard' />
        }
    }


    onSubmit = e => {
        e.preventDefault();
        document.getElementById('btnLogin').disabled = true
        $('body').fadeTo("slow", 0.5).css('pointer-events', 'none');
        var user = this.state.username;
        var pass = this.state.password;
        var data = {
            username: user,
            password: pass
        }
        var config = {
            method: 'post',
            url: 'https://jaffa-suites-backend.herokuapp.com/user/admin-login',
            headers: {},
            data: data
        };
        axios(config)
            .then(res => {
                $('body').fadeTo("slow", 1).css('pointer-events', 'auto');
                document.getElementById('btnLogin').disabled = false
                if (res.data.responseCode == 1) {
                    this.setState({
                        error: ""
                    })
                    UserProfile.setName(this.state.username);
                    this.setRedirect()
                }
                else if (res.data.responseCode == 0) {
                    this.myAlertBottom('alert-danger', 'Error Loggin in', 2000)
                }
            })
            .catch((error) => {
                document.getElementById('btnLogin').disabled = false
                $('body').fadeTo("slow", 1).css('pointer-events', 'auto');
                console.log(error);
                this.myAlertBottom('alert-danger', 'Error Logging In', 2000)
            });
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    render() {
        if (this.loggedIn) {
            return <Redirect to='/dashboard' />;
        }
        return (
            <div className="login-page" style={{ backgroundImage: `url(${back})` }}>
                {this.renderRedirect()}
                <div className="limiter">
                    <div className="container-login100 page-background">
                        <div className="wrap-login100">
                            <form className="login100-form validate-form" onSubmit={this.onSubmit}>
                                <span className="text-center">
                                    <p style={{ color: 'white', fontSize: '30px' }}>Jaffa Suites | Admin Panel</p>
                                </span>
                                <span className="login100-form-title p-b-34 p-t-27">
                                    Log in
                            </span>
                                <div className="wrap-input100 validate-input" data-validate="Enter username">
                                    <input className="input100" type="text" id="username" name="username" onChange={this.onChange} placeholder="Username" />
                                    <i className="material-icons focus-input1001">person</i>
                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Enter password">
                                    <input className="input100" type="password" id="password" onChange={this.onChange} name="pass" placeholder="Password" />
                                    <i className="material-icons focus-input1001">lock</i>
                                </div>
                                <div className="contact100-form-checkbox">
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            {this.state.error}
                                        </label>
                                    </div>
                                </div>
                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn" id='btnLogin'>
                                        Login
                                </button>
                                </div>
                                <div className="text-center p-t-50">
                                    <a className="txt1" href="forgot-password.html">
                                        Forgot Password?
                                </a>
                                </div>
                            </form>
                            <div className="myAlert-bottom alert text-center">
                                <strong id="alert-message"></strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;