import React from 'react';
//import loginImage from "../images/login.png";
import {useRef, useState, useEffect, useContext} from 'react';
import {Link, Navigate, useNavigate, useLocation} from 'react-router-dom';
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
    const hUpdate_data = new FormData(event.currentTarget);
    const hotelId = hUpdate_data.get("hotelId");
    const hUpdate_url = "https://squid-app-w4t8k.ondigitalocean.app/api/hotels/" + hotelId;
    const hUpdate_form = {
        Address: hUpdate_data.get('address'),
        PhoneNumber: hUpdate_data.get('PhoneNumber'),
    };
    axios(
        {
            method: 'put',
            url: hUpdate_url,
            data: JSON.stringify(hUpdate_form),
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
        window.location.href = '/hotels';
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
export default function UpdateHotel(){
    const thisParam = useLocation().pathname.split('/');
    let hotelId = thisParam[2];
    const role = GetRole();
    if(!role.includes("Admin"))
        return(<Navigate to="/hotels"/>);
    return(
        <div className="login-container">
            <div className="header">Update hotel</div>
            <div className="content">
                <div className="img">
                    
                </div>
                <form onSubmit={HandleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='address'>Address</label>
                        <input type="text" id="address" name="address" required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='phone'>Phone Number</label>
                        <input type="text" id="PhoneNumber" name="PhoneNumber" required/>
                        <input type="hidden" id="hotelId" name="hotelId" value={hotelId}/>
                    </div>
                    <div className='footer'>
                        <button type="submit" className='btn'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}