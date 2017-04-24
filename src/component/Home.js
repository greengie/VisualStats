import React, { Component } from 'react'
import {Link} from 'react-router'
class Home extends Component {
  render(){
    return (
      <div>
        <h1>Home</h1>
        <Link to='about'>go to about</Link>
      </div>
    )
  }
}

export default Home
