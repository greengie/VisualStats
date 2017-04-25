import React, { Component } from 'react';
import Selector from './selector_kmean'
import Selector_k from './selector_kmean_k'
import {Row,Col} from 'react-bootstrap';

import Kmean from './kmean'


var value;

class kmeanChart extends Component {
  state = {
    valueSelect: 'popdensity',
    valueSelect2: 'work_hour_per_week',
    valueSelect_k:0

  }

  handleSelect(data){
    this.setState({ valueSelect: data.value })

  }
  handleSelected(data){
    this.setState({ valueSelect2: data.value })
  }
  handleSelect_k(data){
    this.setState({ valueSelect_k: data.value })
  }
  render() {

    return (
      <div>
      <Row className="show-grid">
        <Col md={4}>
        <div style={{padding:'50px'}}>
          <h4>Select: {this.state.valueSelect}</h4>
          <Selector
            handleSelect={this.handleSelect.bind(this)}
          />
        </div>
        </Col>
        <Col md={4}>
        <div style={{padding:'50px'}}>
        <h4>Select: {this.state.valueSelect2}</h4>
        <Selector
          handleSelect={this.handleSelected.bind(this)}
        />
        </div>
        </Col>
        <Col md={4}>
        <div style={{padding:'50px'}}>
        <h4>k : {this.state.valueSelect_k+1}</h4>
          <Selector_k
          handleSelected_k={this.handleSelect_k.bind(this)}
          />
          </div>
        </Col>
      </Row>
        <Kmean
          valueSelect={this.state.valueSelect}
          valueSelect2={this.state.valueSelect2}
          valueSelect_k={this.state.valueSelect_k}


        />
      </div>

    );
  }
}

export default kmeanChart;
