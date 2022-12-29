import React from 'react';
import loginImage from "../images/login.png";
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import {CheckToken} from './Auth';

export const AuthToken = token =>{
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log(axios.defaults.headers.common["Authorization"]);
    }
    else delete axios.defaults.headers.common["Authorization"];
}
export const HandleSubmit = (event) =>{
    event.preventDefault();
    const login_url = "https://squid-app-w4t8k.ondigitalocean.app/api/login";
    const login_data = new FormData(event.currentTarget);
    const login_form = {
        userName: login_data.get('userName'),
        password: login_data.get('password'),
    };
    axios(
        {
            method: 'post',
            url: login_url,
            data: JSON.stringify(login_form),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            crossDomain: true,
        },
    ).then(response => {
        const token = response.data.accessToken;
        localStorage.setItem('token', token);
        AuthToken(token);
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
export default function Login(){
    if(!CheckToken())
        return(<Navigate to="/"/>);
    return(
        <div className="login-container">
            <div className="header">Login</div>
            <div className="content">
                <div className="img">
                    <img src={loginImage}/>
                </div>
                <form onSubmit={HandleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='userName'>Username</label>
                        <input 
                            type="text" 
                            id="userName"
                            name="userName"
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type="text" 
                            id="password"
                            name="password" 
                            required
                        />
                    </div>
                    <div className='footer'>
                        <button type="submit" className='btn'>Login</button>
                    </div>
                </form>
                <p>
                    Need an Acount?<br/>
                    <span className="line">
                        <Link href="/register">Register</Link>
                    </span>
                </p> 
            </div>
        </div>
    )
}