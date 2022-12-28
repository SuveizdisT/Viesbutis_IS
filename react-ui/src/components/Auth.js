import {createContext, useState} from 'react';
import jwtDecode from 'jwt-decode';
import {Navigate} from 'react-router-dom';

export function CheckToken(){
    var expiredToken = true;
    if(localStorage.getItem("token") != null){
        const decoded = jwtDecode(localStorage.getItem("token"));
        if(decoded.exp *1000 >= Date.now()){
            expiredToken = false;
        }
    }
    return expiredToken;
}
export function LogOut(){
    localStorage.removeItem("token");
    window.location.href = '/';
}
export function GetRole(){
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    let role = decode("http://schemas.microsoft.com/ws/2008/06/identity/claims/role");
    return role;
}
export function GetUser(){
    const token = localStorage.getItem("token");
    let jwtData = token.split('.')[1];
    let jwtjson = window.atob(jwtData);
    //console.log(jwtjson);
    let jwtdecode = JSON.parse(jwtjson);
    //console.log(jwtdecode);
    let userName = jwtdecode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    /*console.log(userName);
    const decode = jwtDecode(token);
    console.log(decode);*/
    return userName;
}
const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;
