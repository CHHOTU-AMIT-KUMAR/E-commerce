import React,{useState} from "react";
import {useNavigate} from 'react-router-dom';

const AddProduct=()=>{
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    const [error,setError]=useState(false);
    const navigate=useNavigate();
    const auth=localStorage.getItem('user');
    const productData=async()=>{
        if(!name || !price || !company || !category)
        {
            setError(true);
            return false;
        }
        if(auth)
        {
            navigate('/');
        }
        // console.log({name,price,category,company});
        const userId=JSON.parse(localStorage.getItem('user'))._id; // FOR GETID WE PARSE THE USER 
        // console.log(userId._id);
        let result=await fetch('http://localhost:3000/add-product',{
            method:'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        });
         result=await result.json();
        // console.warn(result);

    }

    return(
        <div className="add-product">
            <h2>Product Information</h2>
            <input value={name} onChange={(e)=>setName(e.target.value)}
            type="text" placeholder="Product Name" className="inputbox"/>
            { error && !name &&<span className="err-span">Enter Valid Name</span>}
            
            <input value={price} onChange={(e)=>setPrice(e.target.value)}
            type="text" placeholder="Product Price" className="inputbox"/>
            { error && !price &&<span className="err-span">Enter Valid Price</span>}
            
            <input value={category} onChange={(e)=>setCategory(e.target.value)}
            type="text" placeholder="Product Category" className="inputbox"/>
            { error && !category &&<span className="err-span">Enter Valid Category</span>}
            
            <input value={company} onChange={(e)=>setCompany(e.target.value)}
            type="text" placeholder="Product Company" className="inputbox"/>
            { error && !company &&<span className="err-span">Enter Valid Company</span>}

            <button onClick={productData}
            type="button" className="add-button"> AddProduct </button>
        </div>
    )
}
export default AddProduct;