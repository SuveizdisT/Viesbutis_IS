import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import { GetRole } from '../Auth';

export const HandleSubmit = (event) =>{
    event.preventDefault();
    const token = localStorage.getItem("token");
    const cCreate_data = new FormData(event.currentTarget);
    const cCreate_url = "https://squid-app-w4t8k.ondigitalocean.app/api/hotels/" + cCreate_data.get('hotelId') +"/corpusses";
    const cCreate_form = {
        Name: cCreate_data.get('name'),
        Type: cCreate_data.get('type'),
    };
    axios(
        {
            method: 'post',
            url: cCreate_url,
            data: JSON.stringify(cCreate_form),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            crossDomain: true,
        },
    ).then(response => {
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
export default function CreateCorpuss(){
    const thisParam = useLocation().pathname.split('/');
    let hotelId = thisParam[2];
    const role = GetRole();
    if(!role.includes("Admin"))
        return(<Navigate to="/hotels"/>);
    return(
        <div className="login-container">
            <div className="header">Create corpuss</div>
            <div className="content">
                <div className="img">
                    
                </div>
                <form onSubmit={HandleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Corpuss name</label>
                        <input type="text" id="name" name="name" required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='type'>Type</label>
                        <input type="text" id="type" name="type" required/>
                        <input type="hidden" id="hotelId" name="hotelId" value={hotelId}/>
                    </div>
                    <div className='footer'>
                        <button type="submit" className='btn'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}