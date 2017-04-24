import React, { Component } from "react";
import d3 from 'd3';
import PlotScatter from './plotScatter';
import axios from 'axios';
import _ from 'lodash';
const d3Queue = require('d3-queue');

require('../stylesheet/correlationMatrix.css');

// const margin = {top: 50, right: 50, bottom: 100, left: 100};
const pad = {left:70, top:40, right:5, bottom: 70};
const width = 500;
const height = 500;
const padding = 5;
const totalh = height + pad.top + pad.bottom;
const totalw = (width + pad.left + pad.right)*2;
const API_URL = 'http://128.199.99.233:3000/api/';

class CorrelationMatrix extends Component {

  constructor(props) {
    super(props);
    // console.log(props);

    this.state = {label_x: '', label_y: '', regressionData: [], showScatterPlot: false, onToggle: 1};
  }

  showData(a,i,j){
    let square = d3.select(this.refs['rect-'+i+'-'+j]);
    square.style("stroke-width", 2)
        .style("stroke", 'black')
        .style("fill", 'yellow');
    let text = d3.select(this.refs['text-'+i+'-'+j]);
    text.style('display', 'block');
  }

  _handleMouseOut(i, j, color){
    let square = d3.select(this.refs['rect-'+i+'-'+j]);
    square.style("stroke-width", 0)
        .style("stroke", null)
        .style("fill", color);
    let text = d3.select(this.refs['text-'+i+'-'+j]);
    text.style('display', 'none');
  }

  _handleMouseClick(i, j){
    console.log('on click');
    axios.post(API_URL+'calregression/'+this.props.label[i]+'/'+this.props.label[j], {
        data: this.props.data
      })
      .then(res => {
        this.setState({regressionData: res.data,
                        showScatterPlot: true,
                        label_x: this.props.label[i],
                        label_y: this.props.label[j]});
      });
    console.log(this.props.label[i]);
    console.log(this.props.label[j]);
  }

  componentWillUpdate(nextProps, nextstate){
    if(nextProps.toggle != this.state.onToggle){
      console.log('have click from regress');
      this.setState({label_x: '', label_y: '', regressionData: [], showScatterPlot: false, onToggle: this.state.onToggle+1});
      return true;
    }
    return false;
  }

  render() {
    const corMatrix = this.props.corMatrix;
    const label = this.props.label;
    const start_color = '#3385ff';
    const end_color = '#ff3333';
    const numrows = corMatrix.length;
    const numcols = corMatrix[0].length;
    const label_x = this.state.label_x;
    const label_y = this.state.label_y;
    const data = this.props.data;
    const regressionData = this.state.regressionData;
    const toggle = this.props.toggle;
    console.log(toggle);
    console.log(this.state.onToggle);
    // const maxValue = d3.max(corMatrix, function(layer) { return d3.max(layer, function(d) { return d; }); });
    // const minValue = d3.min(corMatrix, function(layer) { return d3.min(layer, function(d) { return d; }); });

    const x = d3.scale.ordinal()
  	    .domain(d3.range(numcols))
  	    .rangeBands([0, width]);

  	const y = d3.scale.ordinal()
  	    .domain(d3.range(numrows))
  	    .rangeBands([0, height]);

    const colorMap = d3.scale.linear()
        .domain([-1, 0, 1])
        .range(["darkslateblue", "white", "crimson"]);

    let showScatterPlot;

    if(this.state.showScatterPlot){
      showScatterPlot = (
        <PlotScatter label_x={label_x} label_y={label_y} dataX={data[label_x]} dataY={data[label_y]} width={width} height={height} pad={pad} padding={padding} dataY_predict={regressionData} />
      );
    }

    return(
      <div className='cor-scatter'>
        <svg ref='svg' width={totalw} height={totalh}>
          <g id='corPlot' transform={"translate("+pad.left+","+pad.top+")"}>
            <rect ref='background' width={width} height={height}></rect>
            <text id='corrtitle' x={width/2} y={-pad.top/2} textAnchor={'middle'} dominant-baseline={"middle"}>Correlation-Matrix</text>
            {corMatrix.map((d, i) => {
              return(
                <g key={i} className='row' ref='row' transform={"translate(0," + y(i) + ")"}>
                  {d.map((a, j) => {
                    return(
                      <g key={j} className='cell' ref='cell' transform={"translate(" + x(j) + ", 0)"}>
                        <rect ref={'rect-'+i+'-'+j} width={x.rangeBand()}
                        height={y.rangeBand()} fill={colorMap(a)}
                        onMouseOver={this.showData.bind(this, a, i, j)}
                        onMouseOut={this._handleMouseOut.bind(this, i, j, colorMap(a))}
                        onClick={this._handleMouseClick.bind(this, i, j)} />
                        <text ref={'text-'+i+'-'+j} dy={'.32em'} x={x.rangeBand() / 2} y={y.rangeBand() / 2} fill={'black'}>{Number(a).toFixed(2)}</text>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </g>
          {showScatterPlot}
        </svg>
      </div>
    );
  }
}

export default CorrelationMatrix;
