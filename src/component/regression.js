import React, { Component } from "react";
import axios from 'axios';
import _ from 'lodash';
//import SelectFile from './selectfile'
import CorrelationMatrix from './correlationMatrix'
import {Table, thead, tr, td, tbody, Button, ButtonToolbar, Glyphicon} from 'react-bootstrap';

const API_URL = 'http://128.199.99.233:3000/api/';

class Regression extends Component {

  constructor(props) {
    super(props);
    this.state = {showCorMatrix: false, file_list: [], data: {}, corMatrix: [], label: [], deleteHandle: 1, toggle: 0};
    // console.log('aaaaa');
    this.getFileList();
    // console.log('ccccc');
    console.log(this.props.params.userid);
  }

  getFileList(){
    axios.get(API_URL + 'list/' + this.props.params.userid)
      .then(res => {
        this.setState({file_list: res.data});
        console.log('finish');
      });
  }

  handleSubmit(evt, file) {
    evt.preventDefault();
    console.log('submit');
    // console.log(evt);
    console.log(file);
    var i = file.split('$')[1].split('.')[0];
    var filename = this.state.file_list[i];
    console.log(i);
    console.log(this.state.file_list);
    this.setState({showCorMatrix: false, data: {}, corMatrix: [], label: [], deleteHandle: 1, toggle: 0});
    axios.get(API_URL + 'prediction/' + this.props.params.userid + '/' + filename)
      .then(res => {
        let toggle = 1;
        this.setState({corMatrix: res.data.corMatrix,
                        data: res.data['table-data'],
                        label: res.data.label,
                        showCorMatrix: true,
                        toggle
      });
  });
}

  handleDelete(evt, file){
    evt.preventDefault();
    console.log('delete');
    console.log(file);
    var i = file.split('$')[1].split('.')[0];
    var filename = this.state.file_list[i];
    console.log(i);
    console.log(filename);
    if (window.confirm("Are you sure you want to delete?")) {
      axios.post(API_URL + 'delete',{
        filename: filename,
        fileid: this.props.params.userid
      })
      .then(res => {
        console.log(res.data);
        this.setState({deleteHandle: (this.state.deleteHandle+1), showCorMatrix: false});
      });
    }
  }

  // componentWillMount(){
  //   this.getFileList();
  // }

  componentWillUpdate(nextProps, nextstate){
    if(this.state.deleteHandle != nextstate.deleteHandle){
      console.log('didupdate');
      this.getFileList();
      return true;
    }
    return false;
  }

  render() {
    const file_list = this.state.file_list;
    const corMatrix = this.state.corMatrix;
    const data = this.state.data;
    const label = this.state.label;

    let showCorMatrix;
    let options = [];

    if(this.state.showCorMatrix){
      showCorMatrix = (
        <CorrelationMatrix toggle={this.state.toggle} corMatrix={corMatrix} label={label} data={data} />
      );
    }

    console.log(this.state);

    for(var i=0;i<file_list.length;i++){
      var file_a = file_list[i];
      // console.log(file_list[i]);
      options[i] = (
        <tr key={`${i}`}>
          <td key={i}>{file_list[i]}</td>
          <td>
            <form onSubmit={(evt, file_a) =>
                this.handleSubmit(evt, file_a)
              }
              style={{"display" : "inline"}}>
              <Button type="submit"><Glyphicon glyph="signal" /></Button>
            </form>
            <form onSubmit={(evt, file) => {
                this.handleDelete(evt, file);
                }
              }
              style={{"display" : "inline"}}>
              <input type="hidden" name="nid" value="file_list[i]" />
              <Button type="submit"><Glyphicon glyph="trash" /></Button>
            </form>
          </td>
        </tr>
      );
    }

    return (
      <div className='regression'>
        <div className='container'>
          <Table responsive bordered>
            <thead>
              <tr>
                <th className='table-8'>Filename</th>
                <th className='table-6'>Action</th>
              </tr>
            </thead>
            <tbody>
              {options}
            </tbody>
          </Table>
          {showCorMatrix}
        </div>
      </div>
    );
  }
}

export default Regression;
