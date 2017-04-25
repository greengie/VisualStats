import React, { Component } from 'react';
import Select from 'react-select'
import 'react-select/dist/react-select.css'

var data = [
  { value: 0, label: '1' },
  { value: 1, label: '2' },
  { value: 2, label: '3' },
  { value: 3, label: '4' },
  { value: 4, label: '5' },
  { value: 5, label: '6' },
  { value: 6, label: '7' },
  { value: 7, label: '8' },
  { value: 8, label: '9' },
  { value: 9, label: '10' }


];

function handleChange(e) {
  var options = e.target.options;
  var value = [];
  for (var i = 0, l = options.length; i < l; i++) {
    if (options[i].selected) {
      value.push(options[i].value);
    }
  }
  this.props.someCallback(value);
}

class selector_kmean_k extends Component {

  state = {
    select: "",
    data:[]
  }

  logChange(val) {
    console.log("Selected: " + val.value);
  }

  render(){

    return (
        <div>
          <Select
            name="form-field-name"
            options={data}
            onChange={this.props.handleSelected_k}
            autofocus
          />
        </div>
    )
  }
}

export default selector_kmean_k;
