import React from 'react';
import d3 from 'd3';

export default class Axis extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    var node = this.refs.axis;
    if(this.props.type == 1){
      var axis = d3.svg.axis().orient(this.props.orient).scale(this.props.scale).ticks(10, ",.1s");
    }
    else if(this.props.type == 2) {
      var axis = d3.svg.axis().orient(this.props.orient).scale(this.props.scale).ticks(10);
    }
    else if(this.props.type == 3) {
      var axis = d3.svg.axis().orient(this.props.orient).scale(this.props.scale).ticks(5);
    }
    d3.select(node).call(axis);
  }

  render() {
    // const {type} = this.props;
    return <g className="axis" ref="axis" transform={this.props.translate}></g>
  }
}
