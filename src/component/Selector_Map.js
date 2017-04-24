import React, { Component } from 'react';
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import axios from 'axios'

const API_URL = 'http://128.199.99.233:3000/api/';

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

class Selector_Map extends Component {

  state = {
    select: "",
    data:[]
  }

  logChange(val) {
    this.setState({ select: val.country_code })
    this.props.onSelect(val.country_code)
    console.log("Selected: " + val.country_name);
  }

    componentDidMount(){
    axios.get(API_URL + 'country')
      .then(res => {
        this.setState({data: res.data});
    });
  }

  render(){
    
    return (
        <div>
          <Select
            name="form-field-name"
            labelKey="country_name"
            valueKey="country_code"
            value={this.state.select}
            options={this.state.data}
            onChange={this.logChange.bind(this)}
            autofocus
          />
        </div>
    )
  }
}

export default Selector_Map;
