import React, { useEffect, useState } from 'react';
import { UserContext } from '../UserContext.jsx';
import { useContext } from 'react';
import Header from '../components/Header';
import Places from './Places.jsx';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Account = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    // Determine the current path
    const { pathname } = location;

    // Helper function to check if a path is active
    const isActive = (path) => pathname === path;

    function handleLogout(){
         localStorage.removeItem('token'); // Remove token from local storage
        navigate('/');
        window.location.reload();
    }

    const [places, setPlaces] = useState([]);
    
     useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log("hell");
                console.log("token", token);
                if (token) {
                    const response = await axios.get("http://localhost:4000/places", {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    console.log(response);
                    setPlaces(response.data);
                } else {
                    console.error('No token found');
                }
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        };

        fetchPlaces();
    }, []);

    return (
        <div>
            <Header />
            <div className='p-2 text-center'>Account page for {user?.name}</div>
            <div>
                <nav className='w-full flex justify-center mt-8 gap-4'>
                    <Link
                        to={'/account'}
                        className={`py-2 px-6 rounded-full ${pathname === '/account' && pathname !== '/account/bookings' && pathname !== '/account/accommodations' ? 'bg-red-500 text-white' : ''}`}
                    >
                        Profile
                    </Link>
                    <Link
                        to={'/account/bookings'}
                        className={`py-2 px-6 rounded-full ${isActive('/account/bookings') ? 'bg-red-500 text-white' : ''}`}
                    >
                        Bookings
                    </Link>
                    <Link
                        to={'/account/accomodations'}
                        className={`py-2 px-6 rounded-full ${isActive('/account/accomodations') ? 'bg-red-500 text-white' : ''}`}
                    >
                        Accommodations
                    </Link>
                </nav>
            </div>
            {pathname === '/account' ? (
                <div className='text-center mt-10'>
                    <span className='text-xl '>Logged in as {user?.email}</span><br></br>
                    <button onClick={handleLogout} className='bg-red-500 w-1/4 p-2 rounded-lg text-white mt-3'>Logout</button>
                </div>
            ) : pathname === '/account/bookings' ? (
                <div>Bookings</div>
            ) : pathname === '/account/accomodations' ? (
                <div className='text-center mt-8'>
                    <Link className='bg-red-500 px-6 py-2 rounded-full text-white inline-flex gap-1' to={'/account/newplace'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add New Place
                    </Link>
                    <div className='mt-4 mx-5 '>
                        {places.length > 0 ? (
                            places.map((place) => (
                                <Link to={'/account/accomodations/'+place._id} key={place._id} className='p-4 flex mb-3 border-2 bg-gray-100 rounded-lg'>
                                    <div className='grow shrink-0'>
                                        {/* {place.photos.map((photo, index) => (
                                            <img key={index} src={'http://localhost:4000/'+photo} alt={`place-${index}`} className='w-32 h-32 object-cover' />
                                        ))} */}
                                        
                                        <img src={'http://localhost:4000/'+place.photos[0]} className='w-60 h-60 object-cover rounded-lg'></img>
                                        
                                    </div>
                                    <div className='grow-0 shrink p-5'>
                                        <h2 className='text-2xl font-bold text-left mb-2'>{place.title}</h2>
                                        <p className='text-justify mb-4'>{place.description}</p>
                                        <div className='flex gap-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                                            <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                                            </svg>
                                            <p className='text-justify'>{place.address}</p>
                                        </div>
                                        
                                        {/* <p>{place.perks.join(', ')}</p> */}
                                        {/* <p>{place.extraInfo}</p> */}
                                        {/* <p>Check-in: {place.checkIn}</p> */}
                                        {/* <p>Check-out: {place.checkOut}</p> */}
                                        {/* <p>Max Guests: {place.maxGuests}</p> */}
                                    </div>
                                    
                                </Link>
                            ))
                        ) : (
                            <p>No places available</p>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Account;
