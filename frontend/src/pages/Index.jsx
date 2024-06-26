import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import axios from 'axios';

function Index() {
    const [allPlaces, setAllPlaces] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/allplaces').then((response) => {
            
            setAllPlaces(response.data);
        });
    }, []);

    return (
        <div>
    <Header />
    <div className='p-8 flex flex-wrap gap-6 justify-between'>
        {allPlaces.length > 0 && allPlaces.map(place => (
            <Link to={'/singleplace/'+place._id}  className='w-64 '>  {/* Set a fixed width on the container */}
                <div className='flex flex-col'>
                    {place.photos?.[0] && (
                        <img src={'http://localhost:4000/' + place.photos?.[0]} className='w-64 h-64 object-cover rounded-xl' alt={place.title} />
                    )}
                    <h1 className='text-lg font-semibold mt-2 break-words'>{place.title}</h1>  {/* Truncate long text */}
                    <p><span>$</span>{place.price}<span> per night</span></p>
                </div>
            </Link>
        ))}
    </div>
</div>

    );
}

export default Index;

