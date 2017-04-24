import React, { Component } from 'react';
import Select from 'react-select'
import 'react-select/dist/react-select.css'

var data = [
  { value: 'gdp', label: 'GDP' },
  { value: 'popdensity', label: 'Population Density' },
  { value: 'income_per_person', label: 'Income per person' },
  { value: 'life_expectancy', label: 'Life expectancy at birth' },
  { value: 'total_population', label: 'Total Population' },
  { value: 'expense_on_health', label: 'Total Expenditure On Health' },
  { value: 'work_hour_per_week', label: 'Working hours per week' }
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

class selector_kmean_y extends Component {

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
            onChange={this.props.handleSelected}
            autofocus
          />
        </div>
    )
  }
}

export default selector_kmean_y;
