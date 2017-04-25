import React, { Component } from 'react';
import Select from 'react-select'
import 'react-select/dist/react-select.css'

var data = [
  { value: 'gdp', label: 'GDP (current US$)' },
  { value: 'popdensity', label: 'Population Density (per sq. km.)' },
  { value: 'income_per_person', label: 'Income per person (fixed PPP$)' },
  { value: 'life_expectancy', label: 'Life expectancy at birth (years)' },
  { value: 'total_population', label: 'Total Population' },
  { value: 'expense_on_health', label: 'Total Expenditure On Health (PPP int. $)' },
  { value: 'work_hour_per_week', label: 'Working hours per week (hours)' },
  { value: "tax_revenue", label: 'Tax Revenue (% of GDP)'},
  { value: "inflation", label: 'Inflation, GDP deflator (annual %)'},
  {value: "infant_mortality", label: 'Infant mortality (rate per 1,000 births)'},
  {value: "internet_user", label: 'Internet User (people who use)'},
  {value: "girl_boy_ratio_education", label: 'Ratio of girls to boys in primary and secondary education (%)'},
  {value: "energy_use",	label: 'Energe use, total (toe)'},
  {value: "agricultural_land", label: 'Agricultural land (% of land area)'}
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

class selector_kmean extends Component {

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
            value={this.state.valueSelect}
            onChange={this.props.handleSelect}
            autofocus
          />
        </div>
    )
  }
}

export default selector_kmean;
