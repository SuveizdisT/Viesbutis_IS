/*import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';*/



import React from 'react';
//import loginImage from "../images/login.png";
import {useRef, useState, useEffect, useContext} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
//import AuthContext, { GetUser } from './Auth';
//import axios from '../api/axios';
import axios from 'axios';
//import {CheckToken} from './Auth';
import { FaWindows } from 'react-icons/fa';
import { GetRole } from '../Auth';

/*export const AuthToken = token =>{
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log(axios.defaults.headers.common["Authorization"]);
    }
    else delete axios.defaults.headers.common["Authorization"];
}*/
export const HandleSubmit = (event) =>{
    event.preventDefault();
    const token = localStorage.getItem("token");
    const hCreate_url = "https://squid-app-w4t8k.ondigitalocean.app/api/hotels";
    const hCreate_data = new FormData(event.currentTarget);
    const hCreate_form = {
        Name: hCreate_data.get('name'),
        City: hCreate_data.get('city'),
        Address: hCreate_data.get('address'),
        PhoneNumber: hCreate_data.get('PhoneNumber'),
    };
    axios(
        {
            method: 'post',
            url: hCreate_url,
            data: JSON.stringify(hCreate_form),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            crossDomain: true,
        },
    ).then(response => {
        /*const token = response.data.accessToken;
        localStorage.setItem('token', token);
        AuthToken(token);*/
        //console("Palauk");
        window.location.href = '/';
    }
    ).catch(err => {
        if(!err?.response){
            console.log('No response');
        } else if(err.response?.status == 400){
            console.log('Missing Username or Password');
        } else if(err.response?.status == 401){
            console.log('Unauthorized');
        } else {
            console.log('Login Failed');
        }
    }
    );
}
export default function CreateHotel(){
    const role = GetRole();
    if(!role.includes("Admin"))
        return(<Navigate to="/hotels"/>);
    return(
        <div className="login-container">
            <div className="header">Create hotel</div>
            <div className="content">
                <div className="img">
                    
                </div>
                <form onSubmit={HandleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Hotel name</label>
                        <input type="text" id="name" name="name" required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='city'>City</label>
                        <input type="text" id="city" name="city" required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='address'>Address</label>
                        <input type="text" id="address" name="address" required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='phone'>Phone Number</label>
                        <input type="text" id="PhoneNumber" name="PhoneNumber" required/>
                    </div>
                    <div className='footer'>
                        <button type="submit" className='btn'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
/*export default class NewHotel extends Component{
  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    fetch(process.env.REACT_API+'hotels',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        HotelId: null,
        Name: event.target.Name.value
      })
    })
    .then(res => res.json())
    .then((result)=>{
      alert(result);
    },
    (error)=>{
      alert("Failed");
    })
  }
  render(){
    return(
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
            <Modal.Header closeButton>
              <Modal.Title id="conatianed-modal-title-vcenter">
                Add Hotel
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col sm={7}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="Name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type='text' name='Name' required
                      placeholder='Name'/>
                    </Form.Group>
                    <Form.Group>
                      <Button variant="primary" type="submit">
                        Add Hotel
                      </Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
      </div>
    )
  }
}*/