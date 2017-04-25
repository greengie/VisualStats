import React, { Component } from "react";
import * as d3 from 'd3';
import _ from 'lodash';
import axios from 'axios';
import { World } from './maps';
import {Row, Col} from 'react-bootstrap'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
require('rc-slider/assets/index.css');


const d3Queue = require('d3-queue');
const Slider = require('rc-slider');
const bar_style = {
  width : 500,
  margin : 10
};
const API_URL = 'http://128.199.99.233:3000/api/';

class Main_World extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null , focusCountry: "", value: 2015};
  }

  componentWillMount() {
    d3Queue.queue()
      .defer(d3.json, 'http://128.199.99.233:3000/api/migration_map/'+this.state.value)
      .await((err, data) => {
           this.setState({
               data: data,
               nameIdMap: _.fromPairs(data.map(({ id, name }) => [name, id]))
           });
       });
  }

  changeFocusCountry(country) {
      this.setState({
          focusCountry: country.value
      });
  }

  get countries() {
      const { data } = this.state;

      if (!data) return [];

      return data.map(({ id, name }) => ({ value: id, label: name }));
  }

  onSliderChange(value) {
    // console.log(value);
    this.setState({value,});
    this.getNewData(value);
  }

  getNewData(year){
    axios.get(API_URL+'migration_map/'+year)
      .then(res => {
        this.setState({
          data: res.data,
          nameIdMap: _.fromPairs(res.data.map(({ id, name }) => [name, id]))
        });
      });

  }

  render() {
      return (
        <div className='Map'>
        <div style={{padding:'50px'}}>
        <Select name="focusCountry"
                value={this.state.focusCountry}
                options={this.countries}
                onChange={this.changeFocusCountry.bind(this)} />
        </div>

          <World width={1440} height={600}
              data={this.state.data} nameIdMap={this.state.nameIdMap}
              focusCountry={this.state.focusCountry} year={this.state.value}
              />
              <Row className="show-grid">
                <Col xs={6} md={3}></Col>
                <Col xs={6} md={6}>
                <Slider value={this.state.value} min={1990} max={2015}
                  step={5} style={bar_style}
                  onChange={this.onSliderChange.bind(this)} />
                </Col>
                <Col xsHidden md={3}></Col>
              </Row>
        </div>
      );
  }
}

export default Main_World;
