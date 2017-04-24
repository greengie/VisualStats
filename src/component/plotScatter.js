import React, { Component } from "react";
import d3 from 'd3';
//import Axis from './matrix-axis';
import _ from 'lodash';
const d3Ease = require("d3-ease");
require('../stylesheet/scatter-Matrix.css');

class PlotScatter extends Component{
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {hoverIndex: []};
  }

  initData(dataX, dataY){
    var data = [];
    for(var i=0;i<dataX.length;i++){
      data.push([dataX[i], dataY[i]]);
    }
    return data;
  }

  getLabel(xticks){
    var labels = []
    for(var i=0;i<xticks.length;i++){
      labels.push(Math.pow(10, xticks[i]));
    }
    return labels;
  }

  flash(i){
    // console.log(i);
    var hoverIndex = []
    for(var key=i;key<(i+5);key++){
      hoverIndex.push(key);
      let circle = d3.select(this.refs['circle-'+key]);
      circle.transition()
        .duration(200)
        .ease(d3Ease.easeCubicOut)
        .attr('r', 6)
        .style("fill", 'lightgreen')
    }
    this.setState({hoverIndex: hoverIndex});
  }

  flashOut(){
    for(var i=0;i<this.state.hoverIndex.length;i++){
      let circle = d3.select(this.refs['circle-'+this.state.hoverIndex[i]]);
      circle.transition()
        .duration(1000)
        .ease("bounce")
        .attr('r', 3)
        .style("fill", 'crimson')
    }
  }

  sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
  }

  render(){
    const {height, width, pad, dataX, dataY, dataY_predict, label_x, label_y, padding} = this.props;
    const xMax = (dataX)  => d3.max(dataX, (d) => d);
    const xMin = (dataX)  => d3.min(dataX, (d) => d);
    const yMax = (dataY)  => d3.max(dataY, (d) => d);
    const y_hat_Max = (dataY_predict)  => d3.max(dataY_predict, (d) => d);
    const y_hat_Min = (dataY_predict)  => d3.min(dataY_predict, (d) => d);
    const yMin = (dataY)  => d3.min(dataY, (d) => d);
    const xScale = d3.scale.linear().domain([xMin(dataX), xMax(dataX)]).range([padding, width - padding*2]);
    const yScale = d3.scale.linear().domain([Math.min(yMin(dataY), y_hat_Min(dataY_predict)), Math.max(yMax(dataY), y_hat_Max(dataY_predict))]).range([height - padding, padding]);
    const transform = 'translate(' + (pad.left*2+pad.right+width) + ', ' + (pad.top) + ')';
    const transform_label_y = "rotate(270,"+(-pad.left*0.8)+","+(height/2)+")";
    const line = d3.svg.line()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1]))
      .interpolate("basis");
    const data = this.initData(dataX, dataY).sort(this.sortFunction);
    const data_predict = this.initData(dataX, dataY_predict).sort(this.sortFunction);

    const xticks = xScale.ticks(5);
    const yticks = yScale.ticks(8);

    const xLabels = this.getLabel(xticks);
    const yLabels = this.getLabel(yticks);

    return(
      <g id='scatterPlot' transform={"translate("+(pad.left*2+pad.right+width)+","+pad.top+")"}>
        <rect height={height} width={width} fill={"#c8c8c8"} stroke={"black"} strokeWidth={"1"} pointer-events={"none"}></rect>
        <text id='corrtitle' x={width/2} y={-pad.top/2} textAnchor={'middle'} dominant-baseline={"middle"}>Scatterplot</text>
        <text id='xaxis' class='axes' x={width/2} y={height+pad.bottom*0.7} textAnchor={'middle'} dominant-baseline={"middle"} fill={'slateblue'}>
        {label_x}
        </text>
        <text id='yaxis' class='axes' x={-pad.left*0.8} y={height/2} textAnchor={'middle'} dominant-baseline={"middle"} transform={transform_label_y} fill={'slateblue'}>
        {label_y}
        </text>
        {xticks.map((d, i) => {
          return(
            <text key={i} class='axes' x={xScale(d)} y={height+pad.bottom*0.3} textAnchor={'middle'} dominant-baseline={"middle"}>{d3.format(",.1s")(xLabels[i])}</text>
          );
        })}
        {xticks.map((d, i) => {
          return(
            <line key={i} class='axes' x1={xScale(d)} x2={xScale(d)} y1={0} y2={height} stroke={"white"} strokeWidth={1}></line>
          );
        })}
        {yticks.map((d,i) => {
          return(
            <text key={i} class='axes' x={-pad.left*0.3} y={yScale(d)} textAnchor={'middle'} dominant-baseline={"middle"}>{d3.format(",.1s")(yLabels[i])}</text>
          );
        })}
        {yticks.map((d,i) => {
          return(
            <line key={i} class='axes' y1={yScale(d)} y2={yScale(d)} x1={0} x2={width} stroke={"white"} strokeWidth={1}></line>
          );
        })}
        {data.map((d,i) => {
          return(
            <circle ref={"circle-"+i} key={i+'dot'} r={3} cx={xScale(d[0])} cy={yScale(d[1])} stroke={"black"} strokeWidth={1} fill={'crimson'}/>
          );
        })}
        <path d={line(data_predict)} stroke={'darkslateblue'} />
        {data_predict.map((d,i) => {
          return(
            <circle key={i+'regression-line'} r={2} cx={xScale(d[0])} cy={yScale(d[1])}
            stroke={"black"} strokeWidth={1} fill={'darkslateblue'}
            onMouseOver={this.flash.bind(this, i)}
            onMouseOut={this.flashOut.bind(this)}
            />
          );
        })}
      </g>
    );
  }
}

export default PlotScatter;
