import React, { Component } from 'react';
import { render } from 'react-dom';
import LoginHOC from 'react-facebook-login-hoc';
import axios from 'axios';
import '../stylesheet/bootstrap-social.css'
import '../stylesheet/bootstrap.min.css'
import '../stylesheet/login_button.css'
import {Button, ButtonToolbar} from 'react-bootstrap';

const Router = require('react-router');


const configureLoginProps = {
  scope: 'public_profile',
  xfbml: true,
  cookie: true,
  version: 2.6,
  language: 'en_US',
  appId: '656987957836017'
};

const API_URL = 'http://128.199.99.233:3000/api/';

class Login_n extends Component {
  constructor(props) {
    super(props)

    this.status = this.props.fb.status;
    this.login = this.props.fb.login;
    this.logout = this.props.fb.logout;
  }

  getStatus(response) {
    //console.log(response);
    var accessToken = response.authResponse.accessToken;
    var userID = response.authResponse.userID;
    var path = 'https://graph.facebook.com/'+userID+'/?access_token='+accessToken;
    axios.get(path)
      .then(res => {
        var id = res.data.id;
        var first_name = res.data.name.split(' ')[0];
        var last_name = res.data.name.split(' ')[1];
        console.log(first_name);
        console.log(last_name);
        axios.post(API_URL+'user', {
            userID: id,
            first_name: first_name,
            last_name: last_name
          })
          .then(function (response) {
            Router.browserHistory.push({
              pathname: '/test',
              query: response.data[0]
            });
            // console.log(response.data[0]);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  }

  responseApi(res) {
    // console.log(res)
    console.log('token:', res.accessToken);
  }

  checkLoginState() {
    this.status(this.getStatus.bind(this));
  }

  loginFacebook() {
    this.login(this.getStatus.bind(this));
  }
  logoutFacebook() {
    this.logout()
  }

  render() {
    return (
      <button class="loginBtn loginBtn--facebook" onClick={ this.loginFacebook.bind(this) }>
        Login with Facebook
      </button>
    );
  }
}

export default LoginHOC(configureLoginProps)(Login_n);
