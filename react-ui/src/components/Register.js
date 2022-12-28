import React from 'react';
import registerImage from "../images/register.png";
import axios from 'axios';

export const HandleSubmit = (event) =>{
    event.preventDefault();
    const register_url = "https://squid-app-w4t8k.ondigitalocean.app/api/register";
    const register_data = new FormData(event.currentTarget);
    console.log(register_data.get("password"));
    console.log(register_data.get("password2"));
    if(register_data.get("password") == register_data.get("password2")){
    const register_form = {
        userName: register_data.get('userName'),
        email: register_data.get('email'),
        password: register_data.get('password'),
    };
    axios(
        {
            method: 'post',
            url: register_url,
            data: JSON.stringify(register_form),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            crossDomain: true,
        },
    ).then(response => {
       /* const token = response.data.accessToken;
        localStorage.setItem('token', token);
        AuthToken(token);*/
        console.log("Pavyko");
        window.location.href = '/login';
        //window.location.href = '/';
    }
    ).catch(err => {
        if(!err?.response){
            console.log('No response');
        } else if(err.response?.status == 400){
            console.log('Incorrect data or user already created.');
        } else if(err.response?.status == 401){
            console.log('Unauthorized');
        } else {
            console.log('Register Failed');
        }
    }
    );
} else {console.log("Nepavyko"); window.location.reload();}
}
const Register = () => {
  return (
    <div className="login-container">
        <div className="header">Register</div>
        <div className="content">
            <div className="img">
                <img src={registerImage}/>
            </div>
            <form onSubmit={HandleSubmit}>
                <div className='form-group'>
                    <label htmlFor='userName'>Username</label>
                    <input type="text" id="userName" name="userName" required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type="text" id="email" name="email" required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type="text" id="password" name="password" required />
                </div>
                <div className='form-group'>
                    <label htmlFor='password2'>Confirm password</label>
                    <input type="text" id="password2" name="password2" required />
                </div>
                <div className='footer'>
                    <button type="submit" className='btn'>Register</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Register;