import React from 'react';
import d3  from 'd3';

export default class Country extends React.Component{
  constructor(props){
    super(props);
    this.state = {onClick: false};
  }

  _onMouseOver(isSource, fill){
    // console.log(this.props.mapId[this.props.country.id]);
    // console.log(this.props.data.source[this.props.mapId[this.props.country.id]]);
    // console.log(this.props.data.name);
    if(this.props.data == undefined){
      var value = null;
      var destination = this.props.data.name;
    }else{
      var value = this.props.data.source[this.props.mapId[this.props.country.id]];
      var destination = this.props.data.name;
    }
    var country_name = this.props.mapId[this.props.country.id];
    let node = d3.select(this.refs.country);
    let tooltip = d3.select('#map')
         .append('svg:title')
         .attr('id', 'tooltip');
    tooltip.text(country_name+'\n'+'Migration To '+destination+' is '+value);
    if(isSource){
      node.style('stroke', fill)
          .style('stroke-width', 2)
          .style('fill', fill);
    }
    else{
      node.style('stroke', 'yellow')
          .style('stroke-width', 2)
          .style('fill', 'yellow');
    }
  }

  _onMouseOut(isSource, fill){
    let label = d3.selectAll('#tooltip');
    let node = d3.select(this.refs.country);
    label.transition()
      .duration(0)
      .style("opacity", 0)
      .remove();
    if(!this.state.onClick){
      if(isSource){
        node.style('stroke', 'white')
            .style('stroke-width', 0.25)
            .style('fill', fill);
      }else{
        node.style('stroke', 'white')
            .style('stroke-width', 0.25)
            .style('fill', fill);
      }
    }
  }

  _onClick(isSource, fill){
    // console.log(fill);
    let node = d3.select(this.refs.country);
    if(!this.state.onClick){
      // console.log(this.state.onClick);
      this.setState({onClick: true});
      if(isSource){
        node.style('stroke', fill)
            .style('stroke-width', 2)
            .style('fill', fill);
      }
      else{
        node.style('stroke', 'yellow')
            .style('stroke-width', 2)
            .style('fill', 'yellow');
      }
    }else{
      // console.log(this.state.onClick);
      this.setState({onClick: false});
      if(isSource){
        node.style('stroke', 'white')
            .style('stroke-width', 0.25)
            .style('fill', fill);
      }else{
        node.style('stroke', 'white')
            .style('stroke-width', 0.25)
            .style('fill', fill);
      }
    }
  }

  render() {
    const {d, style, isSource} = this.props;
    const {onClick} = this.state;
    return  <path d={d} ref='country'
                  style={style}
                  onMouseOver={this._onMouseOver.bind(this, isSource, style.fill)}
                  onMouseOut={this._onMouseOut.bind(this, isSource, style.fill)}
                  onClick={this._onClick.bind(this, isSource, style.fill)}
                  />
  }
}
