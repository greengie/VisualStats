import React, { Component } from 'react';
import { Row, Col, Grid, Panel, Image} from 'react-bootstrap';
import SimpleLineChart from './SimpleLineChart'
import SimpleBarChart from './SimpleBarchart'
import SimplePieChart from './SimplePieChart'
import HealthChart from './HealthChart'
import TaxChart from './TaxChart'
import WorkHourChart from './WorkHourChart'
import LifeExpectancyChart from './LifeExpectancyChart'
import { Link } from 'react-router'



import Selector from './selector'
const title = (
  <h3>Panel title</h3>
);

var value;
class Dashboard extends Component {

  state = {
    valueSelect: ''
  }

  handleSelect(value){
    this.setState({ valueSelect: value })
    console.log(value)
  }

  render() {
    return (
      <div className="App">


      <div style={{padding:'50px'}}>
      <Selector onSelect={this.handleSelect.bind(this)} />
      </div>
      <br />
      <Grid>
      <Row>
        <Col xs={3} md={3} lg={3}><WorkHourChart valueSelect={this.state.valueSelect} /></Col>
        <Col xs={3} md={3} lg={3}><HealthChart valueSelect={this.state.valueSelect} /></Col>
        <Col xs={3} md={3} lg={3}><TaxChart valueSelect={this.state.valueSelect} /></Col>
        <Col xs={3} md={3} lg={3}><LifeExpectancyChart valueSelect={this.state.valueSelect} /></Col>
        </Row>
      <Row>
        <Col xs={6} md={6} lg={6}><SimpleLineChart valueSelect={this.state.valueSelect} /></Col>
        <Col xs={6} md={6} lg={6}><SimpleBarChart valueSelect={this.state.valueSelect} /></Col>
        </Row>

        </Grid>
      </div>
    );
  }
}

export default Dashboard;
