// import React from 'react'
// import { UserContext } from '../UserContext.jsx';
// import { useContext } from 'react';
// import Header from '../components/Header';
// import { Link } from 'react-router-dom';


// const Account = () => {
//     const {user} = useContext(UserContext);
//   return (
//     <div>
//         <Header/>
//         {/* <div className='p-2 text-center'>Account page for {user.name} </div> */}
//         <div>
//             <nav className='w-full flex justify-center mt-8 gap-4'>
//                 <Link to={'/account/profile'} className='bg-red-500 py-2 px-6 rounded-full '>Profile</Link>
//                 <Link to={'/account/bookings'} className=' py-2 px-6 rounded-full '>Bookings</Link>
//                 <Link to={'/account/accomodations'} className='py-2 px-6 rounded-full '>Accomodations</Link>
//             </nav>
//         </div>

//     </div>
    
//   )
// }

// export default Account;

import React from 'react';
import { UserContext } from '../UserContext.jsx';
import { useContext } from 'react';
import Header from '../components/Header';
import Places from './Places.jsx';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    // Determine the current path
    const { pathname } = location;

    // Helper function to check if a path is active
    const isActive = (path) => pathname === path;

    function handleLogout(){
        navigate('/');
        window.location.reload();
    }

    return (
        <div>
            <Header />
            <div className='p-2 text-center'>Account page for {user?.name}</div>
            <div>
                <nav className='w-full flex justify-center mt-8 gap-4'>
                    <Link 
                        to={'/account'} 
                        // className='py-2 px-6 rounded-full bg-red-500 text-white'
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
            {
                pathname==='/account'?(
                    <div className='text-center mt-10'>
                        <span className='text-xl '>Logged in as {user?.email}</span><br></br>
                        <button onClick={handleLogout} className='bg-red-500 w-1/4 p-2 rounded-lg text-white mt-3'>Logout</button>
                    </div>
                ): pathname==='/account/bookings'? (
                    <div>Bookings </div>
                ): pathname==='/account/accomodations'?(
                    <div className='text-center mt-8 '>
                    <Link className='bg-red-500 px-6 py-2 rounded-full text-white inline-flex gap-1' to={'/account/newplace'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add New Place
                </Link>
                </div>
                ):(null)
            }
        </div>
    );
}

export default Account;
