import React, { Component } from 'react';
import { Row, Col, Grid, Panel, Image, ResponsiveContainer} from 'react-bootstrap';
import icon from '../image/Tax.png'
//import data from '../data/tax_revenue'
import axios from 'axios'

const API_URL = 'http://128.199.99.233:3000/api/';

function GetFinalData (data,selectorChoose) {
  var value = 0;
  for (var i=0 ; i<data.length ; i++) {
    if (data[i].country_code == selectorChoose) {
      value = data[i].data_value;
      console.log(value);
      return value;
      break;
    }
  }
  if (value == 0) {
    return "undefined";

  }

}


class TaxChart extends Component {

  state = {
    data: {}
  }

  componentDidMount(){
    axios.get(API_URL + 'data/tax_revenue/lin/2010')
      .then(res => {
        this.setState({data: res.data});
      });
  }


  render() {
    const final_data = GetFinalData(this.state.data, this.props.valueSelect)

    return (
      <div>
<div className="w3-container">

<div className="w3-panel w3-card w4 w3-white">
      <h4 style={{textAlign:'center'}} >TAX REVENUE</h4>
      <hr />
      <Image  src={icon} height="42" width="42" responsive className="img-responsive center-block"/>
      <br />
      <p style={{textAlign:'center',color:'#CB4335'}} >{final_data}</p>
      </div>
      </div>
      </div>
    );
  }
}

export default TaxChart;
