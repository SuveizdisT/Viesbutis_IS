import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import { GetRole } from '../Auth';

export const HandleSubmit = (event) =>{
    event.preventDefault();
    const token = localStorage.getItem("token");
    const rCreate_data = new FormData(event.currentTarget);
    const hotelId = rCreate_data.get('hotelId');
    const rCreate_url = "https://squid-app-w4t8k.ondigitalocean.app/api/hotels/" + hotelId + "/corpusses/1/rooms";
    const rCreate_form = {
        roomId: rCreate_data.get('roomId'),
        floor: rCreate_data.get('floor'),
        rating: rCreate_data.get('rating'),
        capacity: rCreate_data.get('capacity'),
        price: rCreate_data.get('price'),
    };
    axios(
        {
            method: 'post',
            url: rCreate_url,
            data: JSON.stringify(rCreate_form),
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
export default function CreateRoom(){
    const thisParam = useLocation().pathname.split('/');
    let hotelId = thisParam[2];
    let corpussId = thisParam[4];
    const role = GetRole();
    if(!role.includes("Admin"))
        return(<Navigate to="/hotels"/>);
    return(
        <div className="login-container">
            <div className="header">Create room</div>
            <div className="content">
                <div className="img">
                    
                </div>
                <form onSubmit={HandleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='number'>Room number</label>
                        <input type="text" id="number" name="number" required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='floor'>Floor</label>
                        <input type="text" id="floor" name="floor" required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='rating'>Rating</label>
                        <input type="text" id="rating" name="rating" required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='capacity'>Capacity</label>
                        <input type="text" id="capacity" name="capacity" required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='price'>Price</label>
                        <input type="text" id="price" name="price" required/>
                        <input type="hidden" id="hotelId" name="hotelId" value={hotelId}/>
                        <input type="hidden" id="corpussId" name="corpussId" value={corpussId}/>
                    </div>
                    <div className='footer'>
                        <button type="submit" className='btn'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}