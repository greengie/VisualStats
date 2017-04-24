  import React, { Component } from 'react';
  import {Table , thead , tr , th , tbody , td} from 'react-bootstrap'
  import {Nav , NavItem, NavDropdown, MenuItem, Navbar} from 'react-bootstrap';


  class table_test extends Component {
  render(){
          return (

            <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">Link</NavItem>
              <NavItem eventKey={2} href="#">Link</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Link Right</NavItem>
              <NavItem eventKey={2} href="#">Link Right</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )
  }
}

export default table_test;
