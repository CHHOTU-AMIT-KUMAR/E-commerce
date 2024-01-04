import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    },[])
    const loginData = async () => {
        // console.log({email,password});
        let result = await fetch('http://localhost:3000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        result = await result.json();
        // console.warn(result);
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));

            navigate('/');
        }
        else{
            alert("Please ENTER correct Detail!")
        }
    }
    return (
        <div className='login'>
            <h3>Login User</h3>
            <input className="inputbox" type='text'placeholder='Enter Email'
               value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input  className="inputbox" type='password' placeholder='Enter Password' 
               value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className='loginButton' type='button'
                onClick={loginData}>Login</button>
        </div>
    )
}
export default Login;
