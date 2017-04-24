import React from 'react';
import {FormControl} from 'react-bootstrap';
const Selector = React.createClass({
  propTypes: {
    selector: React.PropTypes.string.isRequired,
    handleSelectorChange: React.PropTypes.func.isRequired
  },

  render(){
    return(
      <FormControl componentClass="select" value={this.props.selector} onChange={this.props.handleSelectorChange} >
        <option value="gdp">GDP at Market Prices (current US$)</option>
        <option value="popdensity">Population Density (per sq. km.)</option>
        <option value="income_per_person">Income per person (fixed PPP$)</option>
        <option value="life_expectancy">Life expectancy at birth (years)</option>
        <option value="total_population">Total Population</option>
        <option value="expense_on_health">Total Expenditure On Health (PPP int. $)</option>
        <option value="work_hour_per_week">Working hours per week (hours)</option>
        <option value="tax_revenue">Tax Revenue (% of GDP)</option>
        <option value="inflation">Inflation, GDP deflator (annual %)</option>
        <option value="infant_mortality">Infant mortality (rate per 1,000 births)</option>
        <option value="internet_user">Internet User (people who use)</option>
        <option value="girl_boy_ratio_education">Ratio of girls to boys in primary and secondary education (%)</option>
        <option value="energy_use">	Energe use, total (toe)</option>
        <option value="agricultural_land">Agricultural land (% of land area)</option>
        <option value="economic_growth">Economic growth over the past 10 years</option>
        <option value="medical_doctor">Medical Doctors (per 1,000 people)</option>
        <option value="military_expenditure">Military expenditure (% of GDP)</option>
        <option value="foreign_investment">Foreign direct investment, net inflows (% of GDP)</option>
      </FormControl>
    );
  }
});

export default Selector;
