import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import { GetRole } from '../Auth';

export const HandleSubmit = (event) =>{
    event.preventDefault();
    const token = localStorage.getItem("token");
    const cUpdate_data = new FormData(event.currentTarget);
    const hotelId = cUpdate_data.get("hotelId");
    const corpussId = cUpdate_data.get("corpussId");
    const cUpdate_url = "https://squid-app-w4t8k.ondigitalocean.app/api/hotels/" + hotelId + "/corpusses/1";
    const cUpdate_form = {
        Type: cUpdate_data.get('type'),
    };
    axios(
        {
            method: 'put',
            url: cUpdate_url,
            data: JSON.stringify(cUpdate_form),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            crossDomain: true,
        },
    ).then(response => {
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
export default function UpdateCorpuss(){
    const thisParam = useLocation().pathname.split('/');
    let hotelId = thisParam[2];
    let corpussId = thisParam[4];
    const role = GetRole();
    if(!role.includes("Admin"))
        return(<Navigate to="/hotels"/>);
    return(
        <div className="login-container">
            <div className="header">Update corpuss</div>
            <div className="content">
                <div className="img">
                    
                </div>
                <form onSubmit={HandleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='address'>Corpuss type</label>
                        <input type="text" id="type" name="type" required/>
                        <input type="hidden" id="hotelId" name="hotelId" value={hotelId}/>
                        <input type="hidden" id="corpussId" name="corpussId" value={corpussId}/>
                    </div>
                    <div className='footer'>
                        <button type="submit" className='btn'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}