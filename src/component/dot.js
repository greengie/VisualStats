import React from 'react';
import d3 from 'd3';
const d3Ease = require("d3-ease");
import {Tooltip} from 'react-bootstrap';

export default class Dot extends React.Component{
  constructor(props){
    super(props);
    this.state = Object.assign({});
  }
  //
  flash() {
    let tooltip = d3.select('#scatter_plot')
         .append('svg:title')
         .attr('id', 'tooltip');

    var formatNumber = d3.format(".5s");
    let node = d3.select(this.refs.circle);
    this.setState({hoverOn: true});
    node.transition()
        .attr('r', this.props.r*1.5)
        .duration(1000)
        .ease(d3Ease.easeCubicOut)
        .style("stroke-width", 3);

    tooltip.text(this.props.name+"\n"+this.props.labelX+" : "+formatNumber(this.props.real_x)+"\n"+this.props.labelY+" : "+formatNumber(this.props.real_y)+"\n"+this.props.labelR+" : "+formatNumber(this.props.real_r));
  }
  //
  flashOut(){

    let node = d3.select(this.refs.circle);
    let label = d3.selectAll('#tooltip');
    this.setState({hoverOn: false});
    // console.log(this.props.r)
    label.transition()
      .duration(0)
      .style("opacity", 0)
      .remove();

    if(!this.state.onClick){
      node.transition()
          .attr('r', this.props.r)
          .duration(1500)
          .ease(d3Ease.easeCubicOut)
          .style("stroke-width", 2);
    }
  }

  onMouseClick(color){
    // console.log(color);
    let node = d3.select(this.refs.circle);
    if(!this.state.onClick){
      this.setState({onClick: true});
      node.transition()
          .attr('r', this.props.r*1.5)
          .duration(1000)
          .ease(d3Ease.easeCubicOut)
          .style("stroke-width", 2)
          .style("stroke", 'white')
          .style("opacity", 1)
          .style("fill", 'yellow');
    }
    else{
      this.setState({onClick: false});
      node.style("stroke-width", 2)
          .style("stroke", 'white')
          .style("opacity", 0.9)
          .style("fill", color);
    }
  }

  render() {
    const {x, y, r, color, labelX, labelY, labelR} = this.props;
    const {hoverOn, onClick} = this.state;
    return <circle cx={x} cy={y} r={r} fill={color}
            ref="circle" onMouseOver={this.flash.bind(this)}
            onMouseOut={this.flashOut.bind(this)}
            onClick={this.onMouseClick.bind(this, color)} />
  }
}
