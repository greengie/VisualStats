import React from 'react';
import axios from 'axios';
import Selector from './selector-xy';
import R_Selector from './selector-r';
import ScatterPlot from './scatterplot';
import gdp_2010 from '../data/gdp_2010';
import popdensity_2010 from '../data/popdensity_2010';
import total_migration_in_2010 from '../data/total_migration_in_2010';
import indicator_list from '../data/indicator_list';
import correlation_init from '../data/correlation_init';
import cor_init_x from '../data/cor_init_x';
import cor_init_y from '../data/cor_init_y';
import Scaling from './scaling';
import LineChart from './linechart';
import {FormGroup} from 'react-bootstrap';

const Router = require('react-router');

require('rc-slider/assets/index.css');

const Slider = require('rc-slider');

const bar_style = {
  width : 1200,
  margin : 50
};

const totalw = 1200;
const totalh = 600;
const width_1 = (1200*7/10);
const width_2 = totalw-width_1;
const height = 500;
const padding = 5;
const pad ={left:30, top:50, right:70, bottom: 50};

const API_URL = 'http://128.199.99.233:3000/api/';

const Chart = React.createClass({
  // Init InitialState
  getInitialState() {
    return {dataX: gdp_2010,
      dataY: popdensity_2010,
      dataR: total_migration_in_2010,
      value: 2010,
      selectorX: 'gdp',
      selectorY: 'popdensity',
      selectorR: 'total_in',
      xMax: indicator_list.gdp[0],
      yMax: indicator_list.popdensity[0],
      scaling_x: 'lin',
      scaling_y: 'lin',
      corData: correlation_init,
      corDataX: cor_init_x,
      corDataY: cor_init_y
    };
  },
  // for slider and indicator to get new X data
  getDataX(value, selector, scale_x) {
      // API_URL + selectX + value
      axios.get(API_URL + 'data/' + selector + '/' + scale_x + '/' + value)
        .then(res => {
          this.setState({dataX: res.data});
          if(scale_x == "log"){
            this.setState({xMax: indicator_list[this.state.selectorX][1]});
          }
          else if (scale_x == 'lin') {
            this.setState({xMax: indicator_list[this.state.selectorX][0]});
          }
        });
  },
  // for slider and indicator to get new Y data
  getDataY(value, selector, scale_y) {
      // API_URL + selectY + value
      axios.get(API_URL + 'data/' + selector + '/' + scale_y + '/' + value)
        .then(res => {
          this.setState({dataY: res.data});
          if(scale_y == "log"){
            this.setState({yMax: indicator_list[this.state.selectorY][1]});
          }
          else if (scale_y == 'lin') {
            this.setState({yMax: indicator_list[this.state.selectorY][0]});
          }
        });
    },

  getDataR(value, selector){
    axios.get(API_URL + 'data_migration/' + selector + '/' + value)
      .then(res => {
        this.setState({dataR: res.data});
      });
  },

  getCorData(selector1, selector2, selector3, type, scale_x, scale_y, query_type){
    if(type == 'x'){
      axios.get(API_URL + 'correlation/' + selector1 + '/' + selector2 + '/' + this.getyearMin(selector1,selector2,selector3,'getCor')+ '/' + this.getyearMax(selector1,selector2,selector3,'getCor') + '/' + scale_x + '/' + scale_y + '/' + query_type)
        .then(res => {
          if(query_type == '1'){
            this.setState({corData: res.data});
          }
          else if (query_type == '2') {
            this.setState({corDataX: res.data});
          }
        });
    }
    else if (type == 'y') {
      axios.get(API_URL + 'correlation/' + selector1 + '/' + selector2 + '/' + this.getyearMin(selector1,selector2,selector3,'getCor')+ '/' + this.getyearMax(selector1,selector2,selector3,'getCor') + '/' + scale_x + '/' + scale_y + '/' + query_type)
        .then(res => {
          if(query_type == '1'){
            this.setState({corData: res.data});
          }
          else if(query_type == '2') {
            this.setState({corDataY: res.data});
          }
        });
    }
  },
  // handle slider changing
  onSliderChange(value) {
    this.setState({value,});
    this.getDataX(value, this.state.selectorX, this.state.scaling_x);
    this.getDataY(value, this.state.selectorY, this.state.scaling_y);
    this.getDataR(value, this.state.selectorR);
  },
  // handle slider after changing
  onAfterChange(value) {
    console.log(this.state);
  },
  //set yearMin
  getyearMin(selector1, selector2, selector3, type){
    if(type == 'getCor'){
      var yearMin = Math.max(indicator_list[selector1][2],indicator_list[selector2][2],indicator_list[selector3][2]);
    }
    else {
      var yearMin = Math.max(indicator_list[this.state.selectorX][2],indicator_list[this.state.selectorY][2],indicator_list[this.state.selectorR][2]);
    }
    return yearMin;
  },
  //set yearMax
  getyearMax(selector1, selector2, selector3, type){
    if(type == 'getCor'){
      var yearMax = Math.min(indicator_list[selector1][3],indicator_list[selector2][3],indicator_list[selector3][3]);
    }
    else {
      var yearMax = Math.min(indicator_list[this.state.selectorX][3],indicator_list[this.state.selectorY][3],indicator_list[this.state.selectorR][3]);
    }
    return yearMax;
  },
  // handle selector X
  handleSelectorXChange(event) {
    this.setState({selectorX: event.target.value});
    this.getDataX(this.state.value, event.target.value, indicator_list[event.target.value][4]);
    this.setState({scaling_x: indicator_list[event.target.value][4]});
    // get cor x and y
    this.getCorData(event.target.value, this.state.selectorY, this.state.selectorR, 'x', indicator_list[event.target.value][4], this.state.scaling_y, 1);
    // get cor r and x
    this.getCorData(this.state.selectorR, event.target.value, this.state.selectorY, 'x', indicator_list[this.state.selectorR][4], this.state.scaling_x, 2);
    // get cor r and y
    this.getCorData(this.state.selectorR, this.state.selectorY, event.target.value, 'y', indicator_list[this.state.selectorR][4], this.state.scaling_y, 2);
  },
  // handle selector Y
  handleSelectorYChange(event) {
    this.setState({selectorY: event.target.value});
    this.getDataY(this.state.value, event.target.value, indicator_list[event.target.value][4]);
    this.setState({scaling_y: indicator_list[event.target.value][4]});
    // get cor x and y
    this.getCorData(this.state.selectorX, event.target.value, this.state.selectorR, 'y', this.state.scaling_x, indicator_list[event.target.value][4], 1);
    // get cor r and y
    this.getCorData(this.state.selectorR, event.target.value, this.state.selectorX,'y', indicator_list[this.state.selectorR][4], this.state.scaling_y, 2);
    // get cor r and x
    this.getCorData(this.state.selectorR, this.state.selectorX, event.target.value,'x', indicator_list[this.state.selectorR][4], this.state.scaling_x, 2);
  },
  // handel selector R
  handleSelectorRChange(event) {
    this.setState({selectorR: event.target.value});
    this.getDataR(this.state.value, event.target.value);
    // get cor r and x
    this.getCorData(event.target.value, this.state.selectorX, this.state.selectorY, 'x', indicator_list[event.target.value][4], this.state.scaling_x, 2);
    // get cor r and y
    this.getCorData(event.target.value, this.state.selectorY, this.state.selectorX, 'y', indicator_list[event.target.value][4], this.state.scaling_y, 2);
  },
  // handle scale linear-log for x axes
  handleScaleXChange(event) {
    this.setState({scaling_x: event.target.value});
    this.getDataX(this.state.value, this.state.selectorX, event.target.value);
    // get cor x and y
    this.getCorData(this.state.selectorX, this.state.selectorY, this.state.selectorR, 'x', event.target.value, this.state.scaling_y, 1);
    // get cor r and x
    this.getCorData(this.state.selectorR, this.state.selectorX, this.state.selectorY, 'x', indicator_list[this.state.selectorR][4], event.target.value, 2);
    // get cor r and y
    this.getCorData(this.state.selectorR, this.state.selectorY, this.state.selectorX, 'y', indicator_list[this.state.selectorR][4], this.state.scaling_y, 2);
  },
  // handle scale linear-log for y axes
  handleScaleYChange(event) {
    this.setState({scaling_y: event.target.value});
    this.getDataY(this.state.value, this.state.selectorY, event.target.value);
    // get cor x and y
    this.getCorData(this.state.selectorX, this.state.selectorY, this.state.selectorR, 'y', event.target.value, this.state.scaling_x, 1);
    // get cor r and y
    this.getCorData(this.state.selectorR, this.state.selectorY, this.state.selectorX, 'y', indicator_list[this.state.selectorR][4], event.target.value, 2);
    // get cor r and x
    this.getCorData(this.state.selectorR, this.state.selectorX, this.state.selectorY, 'x', indicator_list[this.state.selectorR][4], this.state.scaling_x, 2);
  },

  render() {
    const {dataX, dataY, dataR, selectorX, selectorY, selectorR, value, xMax, yMax, scaling_x, scaling_y, corData, corDataX, corDataY} = this.state;
    return (
        <div className='main'>
          <FormGroup>
            <label>
              X-AXIS :
            </label>
            <Selector selector={selectorX} handleSelectorChange={this.handleSelectorXChange} />
            <Scaling scale={scaling_x} handleScaleChange={this.handleScaleXChange} />
          </FormGroup>
          <FormGroup>
            <label>
              Y-AXIS :
            </label>
            <Selector selector={selectorY} handleSelectorChange={this.handleSelectorYChange} />
            <Scaling scale={scaling_y} handleScaleChange={this.handleScaleYChange} />
          </FormGroup>
          <FormGroup>
            <label>
              R :
            </label>
            <R_Selector selector={selectorR} handleSelectorChange={this.handleSelectorRChange} />
          </FormGroup>
          <div id='chart'>
            <svg ref='svg' width={totalw} height={totalh}>
              <ScatterPlot dataX={dataX} labelX={selectorX} dataY={dataY} labelY={selectorY} year={value} xMax={xMax} yMax={yMax} dataR={dataR} labelR={selectorR} width={width_1} height={height} padding={padding} pad={pad}/>
              <g id='line-chart-1' transform={"translate("+(pad.left*2+width_1)+","+pad.top+")"}>
                <text id='correlationtitle' x={(width_2/2)-pad.left} y={-pad.top/2} textAnchor={'middle'} dominant-baseline={"middle"}>Correlation</text>
                <rect width={width_2-padding*2-pad.right} height={height/3} fill={"#c8c8c8"}></rect>
                <LineChart data={corData} path={'path1'} yearMin={this.getyearMin()} yearMax={this.getyearMax()} year={value} width={width_2-padding*2-pad.right} width_1={width_1} height={height/3} padding={padding} pad={pad} xAxis={false} index={1}/>
              </g>
              <g id='line-chart-2' transform={"translate("+(pad.left*2+width_1)+","+(pad.top+(height/3))+")"}>
                <rect width={width_2-padding*2-pad.right} height={height/3} fill={"#c8c8c8"}></rect>
                <LineChart data={corDataX} path={'path2'} yearMin={this.getyearMin()} yearMax={this.getyearMax()} year={value} width={width_2-padding*2-pad.right} width_1={width_1} height={height/3} padding={padding} pad={pad} xAxis={false} index={2}/>
              </g>
              <g id='line-chart-3' transform={"translate("+(pad.left*2+width_1)+","+(pad.top+(height*2/3))+")"}>
                <rect width={width_2-padding*2-pad.right} height={height/3} fill={"#c8c8c8"}></rect>
                <LineChart data={corDataY} path={'path3'} yearMin={this.getyearMin()} yearMax={this.getyearMax()} year={value} width={width_2-padding*2-pad.right} width_1={width_1} height={height/3} padding={padding} pad={pad} xAxis={true} index={3}/>
              </g>
            </svg>
          </div>
          <div className='year-slider' style={bar_style}>
            <Slider value={value}
              onChange={this.onSliderChange} onAfterChange={this.onAfterChange}
              min={this.getyearMin()} max={this.getyearMax()}
            />
          </div>
        </div>
    );
  }
});

export default Chart;
