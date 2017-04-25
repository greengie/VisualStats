import d3 from 'd3'
import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import KmeanChart from './kmeanChart';
import datasets from '../data/popdensity+work_hour_per_week.js';
// import '../stylesheet/kmean.css'

import axios from 'axios'

// import '../stylesheet/axis_kmean.css'
const API_URL = 'http://128.199.99.233:3000/api/';

var width = self.frameElement ? 960 : innerWidth,
    height = self.frameElement ? 500 : innerHeight;


function GetData (data) {
  var count = 0;
  var final_data =[];
  for (var i=0 ; i<data.length ; i++) {
    for (var j=0; j<data[i].country.length ; j++) {
      final_data[count] ={};
      final_data[count]['cluster'] = i;
      final_data[count]['country_code'] = data[i].country[j].country_code;
      final_data[count]['value1'] = data[i].country[j].value1;
      final_data[count]['value2'] = data[i].country[j].value2;
      count++;
    }
  }
  return final_data;
}

class kmean extends Component {

  state = {
    data: datasets,
    valueSelect: '',
    valueSelect2: '',
    valueSelect_k: 0


  }

  componentWillReceiveProps(nextProps){
    if((this.props.valueSelect !== nextProps.valueSelect) || (this.props.valueSelect2 !== nextProps.valueSelect2)){
      console.log('============' + nextProps.valueSelect +'....' + nextProps.valueSelect2)
      axios.get(API_URL + 'cluster/' + nextProps.valueSelect  +'+'+ nextProps.valueSelect2+ '.json')
        .then(res => {
          this.setState({data: res.data});
      });
  }
  }


  render() {
    //console.log(this.props.valueSelect2)
    //console.log(this.props.valueSelect)

    //console.log(datasets[0].data[0].country)
    console.log(this.state.data);
    console.log(dataset_color);
    var k = this.props.valueSelect_k;

    var w=1200;
    var h=580;
    var padding = 100;

    //var dt = this.state.data
    var dataset = this.state.data[0].data[0]['country'];
    var dataset_color = this.state.data[k].data;
    var final = GetData(dataset_color);
    var xScale = d3.scale.linear()
                          .domain([0, d3.max(dataset, function(d) { return d.value1; })])
                          .range([padding, w - padding * 2])
                          .nice();

    var yScale = d3.scale.linear()
                          .domain([0, d3.max(dataset, function(d) { return d.value2; })])
                          .range([h - padding, padding]);

    var rScale = d3.scale.linear()
                          .domain([0, d3.max(dataset, function(d) { return d.value2; })])
                          .range([2, 5]);

    var el = ReactFauxDOM.createElement('div')
    var color = d3.scale.category10();

    var data = d3.range(20).map(function() { return [Math.random() * width, Math.random() * height]; });

    var svg = d3.select(el)
                .append("svg")
                .attr("width" , w)
                .attr("height" , h);

    var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(5);

    var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis);


    svg.selectAll("circle")
        .data(final)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          return xScale(d.value1);
        })
        .attr("cy", function(d) {
          return yScale(d.value2);
        })
        .attr("r", function(d) {
            return 10;
        })
        .style("fill", function(d) { return color(d.cluster); })
        .style("opacity",0.7)


    return (
      <div>
        {el.toReact()}
      </div>)
}}
export default kmean;
