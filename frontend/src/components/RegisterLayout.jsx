import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function RegisterLayout() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // useNavigate hook

    function registerUser() {
        try{
            axios.post('http://localhost:4000/register', {
            name,
            email,
            password,
        });
        alert("Registration Sucessful!")
        navigate("/login")
        }catch(e){
            alert("Registration Failed")
        }
        
    }

    return (
        <div className="flex justify-center items-center mt-40 text-center">
            <div className="w-1/3">
                <h1 className="font-bold text-3xl p-2">Register</h1>
                <form >
                    <input
                        type="text"
                        className="w-full border border-slate-500 rounded-lg p-1.5 mt-2 mb-2"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    /><br />
                    <input
                        type="email"
                        className="w-full border border-slate-500 rounded-lg p-1.5 mt-2 mb-2"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    /><br />
                    <input
                        type="password"
                        className="w-full border border-slate-500 rounded-lg p-1.5 mt-2 mb-2"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    /><br />
                    <button className="p-2 bg-red-500 w-full rounded-lg mt-5 text-white mb-2" onClick={registerUser}>
                        Register
                    </button>
                    <div>
                        Already have an account? 
                        <span> 
                            <Link to={"/login"} className="reg underline">Login</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterLayout;
