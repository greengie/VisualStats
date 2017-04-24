import React, { Component } from 'react';
import { BarChart, Legend, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {Panel} from 'react-bootstrap';

import axios from 'axios'

const API_URL = 'http://128.199.99.233:3000/api/';




function GetData (data,selectorChoose) {
  const final_data = [];
  for (var i=0 ; i<data.length ; i++) {
    if (data[i].country_code == selectorChoose) {
      final_data.push(data[i]);
    }
  }
  return final_data;
}




class SimpleBarChart extends Component {
        state = {
    data: []
  }

  componentDidMount(){
    for (var i=0; i<10 ; i++) {
    axios.get(API_URL + 'data/gdp/lin/' + (2005+i))
      .then(res => {
        this.setState({data: [...this.state.data, ...res.data]});
    });
    }
  }
  render(){
    const final_data = GetData(this.state.data,this.props.valueSelect)
    const title = (
  <h3>EXPENSE ON HEALTH<br />(2010)</h3>
);

    return (
<div className="w3-container">

<div className="w3-panel w3-card w4 w3-white">
      <h4  >POPULAR DENSITY</h4>
      <hr /> 
      <ResponsiveContainer height='100%' width='100%' aspect={4.0/3.0}>
        <BarChart data={final_data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="year"/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Legend />
         <Bar dataKey="data_value" fill="#5FCAE4" />
        </BarChart>
        </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default SimpleBarChart;

// ReactDOM.render(
//   <SimpleLineChart />,
//   document.getElementById('container')
// );
