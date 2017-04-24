import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
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


class SimpleLineChart extends Component {
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


    return (
      <div>
<div className="w3-container">

<div className="w3-panel w3-card w4 w3-white">
      <h4  >GDP</h4>
      <hr />     
       <ResponsiveContainer height='100%' width='100%' aspect={4.0/3.0}>
        <LineChart data={final_data}>
          <Line type='monotone' dataKey='data_value' stroke='#5FE4C2' strokeWidth={2} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
        </LineChart>
        </ResponsiveContainer>
      </div>
      </div>
      </div>

    );
  }
}

export default SimpleLineChart;

// ReactDOM.render(
//   <SimpleLineChart />,
//   document.getElementById('container')
// );
