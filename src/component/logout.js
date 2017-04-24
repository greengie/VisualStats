import React, { Component } from "react";
import {Button, ButtonToolbar} from 'react-bootstrap';
const Router = require('react-router');

export default class Logout extends Component {

  logoutFacebook(){
    FB.logout(function(response) {
      console.log('press button');
      Router.browserHistory.push('/');
    });
  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" id='logout' type='button' onClick={this.logoutFacebook} >Logout</Button>
      </div>
    );
  }
}
