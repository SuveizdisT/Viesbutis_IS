import React from 'react';
import registerImage from "../images/register.png";

const Register = () => {
  return (
    <div className="login-container">
        <div className="header">Register</div>
        <div className="content">
            <div className="img">
                <img src={registerImage}/>
            </div>
            <form>
                <div className='form-group'>
                    <label htmlFor='userName'>Username</label>
                    <input type="text" name="userName" placeholder='userName'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type="text" name="email" placeholder='email'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type="text" name="password" placeholder='password'/>
                </div>
            </form>
        </div>
        <div className='footer'>
            <button type="button" className='btn'>Register</button>
        </div>
    </div>
  );
};

export default Register;