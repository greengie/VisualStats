import React from 'react';
import {FormControl} from 'react-bootstrap';

const Scaling = React.createClass({
  propTypes: {
    scale: React.PropTypes.string.isRequired,
    handleScaleChange: React.PropTypes.func.isRequired
  },

  render(){
    // console.log(this.props.scale);
    return(
      <FormControl style={{ width: 150 }}componentClass="select" value={this.props.scale} onChange={this.props.handleScaleChange}>
        <option value="lin">Linear</option>
        <option value="log">Logarithm</option>
      </FormControl>
    );
  }
});

export default Scaling;
