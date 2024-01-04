import React from "react";
import {Link,useNavigate} from 'react-router-dom';
import App from '../App.css'

const Nav=()=>
{
    const auth=localStorage.getItem('user');
    const navigate=useNavigate();
    const logout=()=>{

        localStorage.removeItem('user');
        navigate('/signup');
    }
    return(
        <div>
            <img 
            className="logo"
            alt="logo"
            src="https://signature.freefire-name.com/img.php?f=7&t=Amit" />
            {auth ? <ul className="Nav-Ul">
                <li> <Link to='/'>Product</Link></li>
                <li> <Link to='/add'>Add Product</Link></li>
                <li> <Link to='/update'>Update Product</Link></li>
                <li> <Link to='/profile'>Profile</Link></li>
                <li><Link onClick={logout} to='/logout'>Logout({JSON.parse(auth).name})</Link></li>

            </ul>
                : <ul className="Nav-Ul l-b">
                    
                    <li> <Link to='/signup'>SignUp</Link> </li>
                    <li> <Link to='/login'>Login</Link></li>
                    
                  </ul>
            }
        </div>
    )
}
export default Nav;