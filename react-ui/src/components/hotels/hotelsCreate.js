import React from 'react';
import {Navigate} from 'react-router-dom';
import axios from 'axios';
import { GetRole } from '../Auth';

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