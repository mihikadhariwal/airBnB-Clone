import React from 'react';
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";

function Index(){
    
    return(
        <div>
            <Header />
            {/* {user && (
                <div className="text-center mt-10">
                    <h1 className="text-3xl">Welcome, {user.name}!</h1>
                </div>
            )} */}
        </div>
    );
}

export default Index;
