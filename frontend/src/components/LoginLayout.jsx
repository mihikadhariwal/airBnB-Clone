import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";


function LoginLayout(){
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [redirect, setredirect]=useState(false);
    const navigate=useNavigate();
    const {setUser}=useContext(UserContext);

    const loginUser = async (e) => {
         e.preventDefault();
      
        try {
            const response = await axios.post('http://localhost:4000/login', {
                email,
                password
            });

            if (response.status === 200) {
                setUser(response.data);
                alert("Login successful!");
                setredirect(true);
            } 
        } catch (e) {
            if (e.response && e.response.status === 401) {
                alert("Invalid credentials");
            } else {
                alert("Login failed");
            }
            console.log(e);
        }
        
    }
    if(redirect){
        navigate('/');
    }
    return (
        <div className="flex justify-center items-center mt-48 text-center">
                <div className="w-1/3">
                <h1 className="font-bold text-3xl p-2">Login</h1>
                <form>
                    <input type="email" className="w-full border border-slate-500 rounded-lg p-1.5 mt-2 mb-2" placeholder="Enter email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}>
                    </input><br></br>
                    <input type="password" className="w-full border border-slate-500 rounded-lg p-1.5 mt-2 mb-2" placeholder="Enter password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}>
                    </input><br></br>
                    <button className="p-2 bg-red-500 w-full rounded-lg mt-5 text-white mb-2" onClick={loginUser}>Login</button>
                    <div>Don't have an account yet? <span> <Link to={"/register"} className="reg underline">Register Now</Link></span></div>
                </form>
                </div>
        </div>
    );
}

export default LoginLayout;