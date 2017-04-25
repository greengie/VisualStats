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

class sidebar extends Component {
  constructor(props){
    super(props);
    // console.log(this.props);
    this.state = this.props.location.query;
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
            <a  style={{color:'white', fontFamily: 'saxmono'}}>VISUALSTATS</a>
            </LinkContainer>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1}>
              <Logout />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Nav justified activeKey={1}>
        <LinkContainer to='/test/dashboard'>
          <NavItem eventKey={1}>Dashboard</NavItem>
        </LinkContainer>
        <LinkContainer to='/test/map'>
          <NavItem eventKey={2}>Map</NavItem>
        </LinkContainer>
        <LinkContainer to='/test/chart'>
          <NavItem eventKey={3}>BubbleChart</NavItem>
        </LinkContainer>
        <LinkContainer to={'/test/cluster'}>
          <NavItem eventKey={6}>K-Mean</NavItem>
        </LinkContainer>
        <LinkContainer to={'/test/regression/'+this.state.id}>
          <NavItem eventKey={4}>Regression</NavItem>
        </LinkContainer>
        <LinkContainer to={'/test/upload/'+this.state.id}>
          <NavItem eventKey={5}>Upload</NavItem>
        </LinkContainer>
      </Nav>

    {this.props.children}
    </div>


    );
  }
};

export default sidebar;
