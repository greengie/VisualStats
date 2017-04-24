import React, { Component } from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import reactCSS from 'reactcss'
import {Link} from 'react-router'
import '../stylesheet/animate.min.css';
import '../stylesheet/paper-dashboard.css';
import '../stylesheet/bootstrap.min.css';
import '../fonts/themify.eot'



class App2 extends Component {
  render(){
    const styles = reactCSS({
      'default': {
        navheader: {
        backgroundColor : "transparent",
        border : "transparent",
      },
      navItem: {
        color:"white"

      },
      },
    })
    return (
      <div className="wrapper">
        <div className="sidebar" data-background-color="#D7EFF0" data-active-color="danger">
          <div className="sidebar-wrapper">
            <ul className="nav">
                <li>
                    <Link to='test/about1'>
                        <i className=""></i>
                        <p>Dashboard</p>
                    </Link>
                </li>
                <li className="active">
                  <i className="ti-map"></i>
                  <p>Maps</p>
                </li>
                <li>
                  <i className="ti-view-list-alt"></i>
                  <p>Table</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="main-panel">
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                  <div className="navbar-header">
                      <button type="button" class="navbar-toggle">
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar bar1"></span>
                          <span className="icon-bar bar2"></span>
                          <span className="icon-bar bar3"></span>
                      </button>                
                    </div>
                  <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                      <li>
                        <p>HOME</p>
                      </li>
                      <li>
                        <p>login</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
  
      {this.props.children}
      </div>
    )
  }
}

export default App2
