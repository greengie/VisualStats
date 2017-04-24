import React, { Component } from "react";
import {bindAll} from 'lodash';
import axios from 'axios';
import $ from 'jquery';
import {Button, FormGroup, Input, FormControl, FieldGroup} from 'react-bootstrap';

const API_URL = 'http://128.199.99.233:3000/api/';

class Upload extends Component {

  constructor(props) {
    super(props);
    // console.log(this.props.params.file_num);
    this.state = {
      data_uri: null,
      processing: false
    };
    bindAll(this, 'handleFile', 'handleSubmit');
  }

  getfileNum(){
    axios.get(API_URL + 'limit/' + this.props.params.userid)
      .then(res => {
        this.setState({file_num: res.data[0].num_file});
        // return res.data[0].num_file;
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const _this = this;

    this.setState({
      processing: true
    });

    if(this.state.file_num < 3){
      if(this.state.filesize <= 10000000){
        if(this.state.filetype == "text/csv"){
          const promise = $.ajax({
            url: API_URL+'upload',
            type: "POST",
            data: {
              data_text: this.state.data_text,
              filename: this.state.filename,
              fileid: this.state.fileid,
              file_num: this.state.file_num,
              filetype: this.state.filetype
            },
            dataType: 'json',
          });
          promise.done(function(data){
            console.log(data);
            _this.setState({
              processing: false,
              uploaded_uri: data.uri,
              file_num: data
            });
            window.alert("Upload Complete");
          });
        }
        else{
          window.alert("Your file is not in .csv type");
          _this.setState({
            processing: false
          });
        }
      }
      else{
        window.alert("Your file is larger than 10 MB");
        _this.setState({
          processing: false
        });
      }
    }
    else{
      window.alert("You have upload to limit(limit are 3 files)");
      _this.setState({
        processing: false
      });
    }
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log(file);
    reader.onload = (upload) => {
      this.setState({
        data_text: upload.target.result,
        filename: file.name,
        fileid: this.props.params.userid,
        filetype: file.type,
        filesize: file.size
      });
    };

    reader.readAsText(file);
  }

  componentDidMount(){
    this.getfileNum();
  }

  render() {
    let processing;
    let uploaded;

    if (this.state.uploaded_uri) {
      uploaded = (
        <div>
          <h4>File uploaded!</h4>
        </div>
      );
    }

    if (this.state.processing) {
      processing = "Processing File, hang tight";
    }

    console.log(this.state.file_num);

    return (
      <div>
          <p style={{textAlign:'center'}} >Upload File</p>
          <p style={{textAlign:'center'}} >Can Upload {3-this.state.file_num} files</p>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <input type="file" onChange={this.handleFile} />
            <input disabled={this.state.processing} className='btn btn-primary' type="submit" value="Upload" />
            {processing}
          </form>
          {uploaded}
      </div>
    );
  }
}

export default Upload;
