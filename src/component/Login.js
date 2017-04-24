import React, { Component } from 'react';
import {Form, FormGroup, Col, FormControl, Checkbox, Button} from 'react-bootstrap'
import '../stylesheet/bootstrap-social.css'
import '../stylesheet/bootstrap.min.css'
import '../stylesheet/animate-home.min.css'
import {Link} from 'react-router'
import { LinkContainer } from 'react-router-bootstrap';


class Login extends Component {

render() {

return (
  <div className="animation animated-item-1">
  <div className="w3-container" >
  <div style={{opacity:0.7}}>
  <div className="w3-panel w3-card w4 w3-black">
        <h4  style={{textAlign:'center'}} >LOGIN</h4>
        <hr />
        <br />
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </Form>
        <Link to="/test">
        <a className="btn btn-block btn-social btn-facebook">
          <span className="fa fa-twitter"></span> Sign in with Facebook
        </a>
        </Link>
        <br />

        </div>
        </div>
        </div>
        </div>
);
}
}
export default Login;
