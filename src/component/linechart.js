import React from 'react';
import d3 from 'd3';
import Axis from './axis';
import d3Ease from 'd3-ease';
require('../stylesheet/Linechart.css');

export default class LineChart extends React.Component{
  constructor(props) {
    super(props);
  }

  getY(data, year){
    for(var i=0;i<data.length; i++){
      if(data[i]['y'] == year){
        var rY = data[i]['x'];
        return rY;
        break;
      }
    }
  }

  flash(r, pos_x, pos_y, index) {
    let tooltip = d3.select('body')
         .append('div')
         .attr('class', 'tooltip');

    // console.log(r);
    // console.log(pos_x);
    var r_format = r.toFixed(3);

    let node = d3.select(this.refs.circle);

    node.transition()
        .attr('r', 4*1.5)
        .duration(500)
        .ease(d3Ease.easeCubicOut)
        .style("stroke", "white")
        .style("fill", "yellow")
        .style("stroke-width", 1);

    tooltip.transition()
      .duration(500)
      .style("opacity", .9);
    if(index == 1){
      tooltip.html("Correlation of X-axis and Y-axis : "+r_format)
        .style("left", (this.props.width_1+pos_x+this.props.pad.left) + "px")
        .style("top", (650+((index-1)*(150+(index*5)))) + "px");
    }else if(index == 2){
      tooltip.html("Correlation of R-axis and X-axis : "+r_format)
        .style("left", (this.props.width_1+pos_x+this.props.pad.left) + "px")
        .style("top", (650+((index-1)*(150+(index*5)))) + "px");
    }else if(index == 3){
      tooltip.html("Correlation of R-axis and Y-axis : "+r_format)
        .style("left", (this.props.width_1+pos_x+this.props.pad.left) + "px")
        .style("top", (650+((index-1)*(150+(index*5)))) + "px");
    }
  }

  flashOut(){
    let node = d3.select(this.refs.circle);
    let label = d3.selectAll('.tooltip');

    label.transition()
      .duration(200)
      .style("opacity", 0)
      .remove();

    node.transition()
        .attr('r', 4)
        .duration(500)
        .ease(d3Ease.easeCubicOut)
        .style("stroke-width", 1)
        .style('fill', '#FA7F9F')
        .style("stroke", '#891836');
  }


  render(){
    const {data, width, width_1, height, padding, yearMin, yearMax, year, path, pad, xAxis, index} = this.props;
    const rY = this.getY(data,year);
    // const rYA = this.getY(dataA, year);
    // const rYB = this.getY(dataB, year);
    const line = d3.svg.line()
      .x((d) => xScale(d['y']))
      .y((d) => yScale(d['x']));
    const xScale = d3.scale.linear().domain([yearMin, yearMax]).range([padding, width-padding]);

    // return a function that "scales" Y coordinates from the data to fit the chart.
    const yScale = d3.scale.linear().domain([-1,1]).range([height - padding, padding]);

    const xSettings = {
      translate: 'translate(0,' + (height - padding) + ')',
      scale: xScale,
      orient: 'bottom'
    };

    const ySettings = {
      translate: 'translate(' + (padding) + ', 0)',
      scale: yScale,
      orient: 'left'
    };

    const highlightMark1 = <circle ref='circle' cx={xScale(year)} cy={yScale(rY)}
                                    r={4} className='highlight-mark-1'
                                    onMouseOver={this.flash.bind(this, rY, xScale(year), yScale(rY), index)}
                                    onMouseOut={this.flashOut.bind(this)} />;

    let showXAxis
    if(xAxis){
      showXAxis = (
        <Axis type={3} {...xSettings}/>
      );
    }

    return(
      <g class='lineChart'>
        <path className={path} d={line(data)} stroke={'blue'} />
        <g className="xy-axis">
          {showXAxis}
          <Axis type={2} {...ySettings}/>
        </g>
        {highlightMark1}
      </g>
    );
  }
}
