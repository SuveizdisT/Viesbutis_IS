import React from 'react';
import loginImage from "../images/login.png";
import {useRef, useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from './Auth';
import axios from '../api/axios';
const LOGIN_URL = '/Auth';

const Login = () => {
  const {setAuth} = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() =>{
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post(LOGIN_URL, JSON.stringify({user, pwd}),
        {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }
        );
        console.log(JSON.stringify(response?.data));
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({user,pwd,roles,accessToken});
        setUser('');
        setPwd('');
        setSuccess(true);
    } catch (err) {
        if(!err?.response){
            setErrMsg('No response');
        } else if(err.response?.status == 400){
            setErrMsg('Missing Username or Password');
        } else if(err.response?.status == 401){
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
  }

    return (
    <>
    {success ? (
        <p>
            <Link to="../"></Link>
        </p>
    ) : (
        <div className="login-container">
            <div className="header">Login</div>
            <div className="content">
                <div className="img">
                    <img src={loginImage}/>
                </div>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} 
                aria-live="assertive">{errMsg}</p> 
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='userName'>Username</label>
                        <input 
                            type="text" 
                            id="userName" 
                            ref={userRef}
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type="text" 
                            id="password" 
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                    </div>
                    <div className='footer'>
                        <button type="button" className='btn'>Login</button>
                    </div>
                </form>
                <p>
                    Need an Account?<br/>
                    <span className="line">
                        <Link to="/Register">Register</Link>
                    </span>
                </p> 
            </div>
        </div>
    )}
    </>
    );
};

export default Login;