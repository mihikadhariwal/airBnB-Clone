import React from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Header from "../components/Header.jsx";

function Index(){
    const location = useLocation();
    const user = location.state?.user; // Retrieve user data from location state
    return(
        <div>
            <Header user={user}/>
            {/* {user && (
                <div className="text-center mt-10">
                    <h1 className="text-3xl">Welcome, {user.name}!</h1>
                </div>
            )} */}
        </div>
    );
}

export default Index;
