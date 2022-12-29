import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import { GetRole } from '../Auth';

export const HandleSubmit = (event) =>{
    event.preventDefault();
    const token = localStorage.getItem("token");
    const rUpdate_data = new FormData(event.currentTarget);
    const hotelId = rUpdate_data.get("hotelId");
    const corpussId = rUpdate_data.get("corpussId");
    const roomId = rUpdate_data.get("Id");
    const rUpdate_url = "https://squid-app-w4t8k.ondigitalocean.app/api/hotels/" + hotelId + "/corpusses/1/rooms/"+roomId;
    const rUpdate_form = {
      roomId: rUpdate_data.get('roomId'),
      floor: rUpdate_data.get('floor'),
      rating: rUpdate_data.get('rating'),
      capacity: rUpdate_data.get('capacity'),
      price: rUpdate_data.get('price'),
      hotelId: rUpdate_data.get('hotelId'),
      corpussId: rUpdate_data.get('corpussId'),
    };
    axios(
        {
            method: 'put',
            url: rUpdate_url,
            data: JSON.stringify(rUpdate_form),
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
export default function UpdateRoom(){
    const thisParam = useLocation().pathname.split('/');
    let hotelId = thisParam[2];
    let corpussId = thisParam[4];
    let roomId = 1;
    const role = GetRole();
    if(!role.includes("Admin"))
        return(<Navigate to="/hotels"/>);
    return(
        <div className="login-container">
            <div className="header">Update room</div>
            <div className="content">
                <div className="img">
                    
                </div>
                <form onSubmit={HandleSubmit}>
                  <div className='form-group'>
                        <label htmlFor='roomId'>RoomId</label>
                        <input type="number" id="roomId" name="roomId" required/>
                  </div>
                  <div className='form-group'>
                        <label htmlFor='floor'>Floor</label>
                        <input type="number" id="floor" name="floor" required/>
                  </div>
                  <div className='form-group'>
                        <label htmlFor='rating'>Rating</label>
                        <input type="number" id="rating" name="rating" required/>
                  </div>
                  <div className='form-group'>
                        <label htmlFor='capacity'>Capacity</label>
                        <input type="number" id="capacity" name="capacity" required/>
                  </div>
                  <div className='form-group'>
                        <label htmlFor='price'>Price</label>
                        <input type="number" id="price" name="price" required/>
                  </div>
                  <div className='form-group'>
                        <label htmlFor='hotelId'>HotelID</label>
                        <input type="number" id="hotelId" name="hotelId" required/>
                  </div>
                  <div className='form-group'>
                        <label htmlFor='corpussId'>CorpussID</label>
                        <input type="number" id="corpussId" name="corpussId" required/>
                        <input type="hidden" id="Id" name="Id" value={roomId} required/>
                  </div>
                    <div className='footer'>
                        <button type="submit" className='btn'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}