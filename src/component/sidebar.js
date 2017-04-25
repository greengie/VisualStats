import React, { Component } from 'react';
import {Link} from 'react-router'
import { LinkContainer } from 'react-router-bootstrap';
import reactCSS from 'reactcss'
import '../stylesheet/Chart.css'
import 'antd/dist/antd.css';
import table_test from './table_test'
import Main_World from './main_world'
import Dashboard from './Dashboard'
import Background from '../image/bg_chart.jpg'
import Logout from './logout.js'
import {Nav , NavItem, NavDropdown, MenuItem, Navbar} from 'react-bootstrap';
import { Layout, Menu, Breadcrumb, Tabs, Icon } from 'antd';

const { Header, Content, Footer } = Layout;
const TabPane = Tabs.TabPane;
const Router = require('react-router');

class sidebar extends Component {
  constructor(props){
    super(props);
    // console.log(this.props);
    this.state = this.props.location.query;
  }

  logoutFacebook(){
    FB.logout(function(response) {
      console.log('press button');
      Router.browserHistory.push('/');
    });
  }
  render() {
    // const id = this.props.location.query.id;
    console.log(this.state.id);

    return (
      <div>
      <Navbar inverse collapseOnSelect style={{backgroundImage: `url(${Background})`}}>
        <Navbar.Header>
          <Navbar.Brand>
          <LinkContainer to='/test'>
            <a>
              <p style={{color:'#66b3ff', fontFamily: 'saxmono', fontSize: 30, display:'inline'}}>VISUAL</p>
              <p style={{color:'#66ffb3', fontFamily: 'saxmono', fontSize: 30, display:'inline'}}>STATS</p>
            </a>
            </LinkContainer>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown eventKey={3} id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} href="#upload">
                <LinkContainer to={'/test/upload/'+this.state.id}>
                  <NavItem eventKey={3.2}>Upload</NavItem>
                </LinkContainer>
              </MenuItem>
              <MenuItem eventKey={3.3} href="#logout" onSelect={this.logoutFacebook}>
                Logout
              </MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Nav justified activeKey={1}>
        <LinkContainer to='/test/dashboard'>
          <NavItem eventKey={1} style={{fontWeight: 'bold'}}>Dashboard</NavItem>
        </LinkContainer>
        <LinkContainer to='/test/map'>
          <NavItem eventKey={2} style={{fontWeight: 'bold'}}>Map</NavItem>
        </LinkContainer>
        <LinkContainer to='/test/chart'>
          <NavItem eventKey={3} style={{fontWeight: 'bold'}}>BubbleChart</NavItem>
        </LinkContainer>
        <LinkContainer to={'/test/cluster'}>
          <NavItem eventKey={4} style={{fontWeight: 'bold'}}>K-Mean</NavItem>
        </LinkContainer>
        <LinkContainer to={'/test/regression/'+this.state.id}>
          <NavItem eventKey={5} style={{fontWeight: 'bold'}}>Regression</NavItem>
        </LinkContainer>
      </Nav>

    {this.props.children}
    </div>


    );
  }
};

export default sidebar;
