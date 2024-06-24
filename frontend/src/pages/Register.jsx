import { useState } from "react";
import Header from "../components/Header";
import RegisterLayout from "../components/RegisterLayout";
import axios from 'axios';

function Register(){
    
    return(
        <div>
            <Header/>
            <RegisterLayout/>
            
        </div>
    );
}

export default Register;