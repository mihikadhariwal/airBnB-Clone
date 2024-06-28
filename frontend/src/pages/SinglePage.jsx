import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header';
import axios from 'axios';
import {differenceInCalendarDays} from "date-fns";

const SinglePage = () => {
    const {id} = useParams();
    const [place, setPlace] = useState({});

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState('1');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(0);
    const navigate = useNavigate();

    let numberOfDays=0;
    if (checkIn && checkOut){
        numberOfDays = differenceInCalendarDays(new Date(checkOut) , new Date(checkIn));
    }

    useEffect(()=>{
        if(!id){
            return;
        }else{
            axios.get(`http://localhost:4000/singleplace/${id}`).then((response)=>{
                setPlace(response.data);
            })
        }
    }, [id])

    async function bookThisPlace() {
        try {
            const token = localStorage.getItem('token'); // Get token from local storage
            console.log("retrived from local storage ", token);
            const response = await axios.post('http://localhost:4000/booking', {
                place: id,
                checkIn,
                checkOut,
                maxGuests,
                name,
                phone,
                price: numberOfDays * place.price,
            }, {
                headers: {
                'Authorization': `Bearer ${token}`
        }
      });
            console.log(response.data.message);
            navigate('/account/bookings');
        } catch (error) {
            console.error('Error booking the place:', error);
            // Optionally, handle the error
        }
    }
  return (
    <div>
        <Header/>
        <div className="mt-4 bg-gray-100 p-6">
            <h1 className="text-3xl mb-2 ">{place.title}</h1>
            <p className='underline mb-3'>{place.address}</p>
            
            <div className="grid gap-2 grid-cols-[2fr_1fr]">
                    <div className='flex flex-col '>
                        {place?.photos?.[0] && (
                            <div className='flex-1 '>
                                <img src={`http://localhost:4000/${place.photos[0]}`} className='w-full h-full object-cover rounded-3xl' alt={place.title} />
                            </div>
                        )}
                    </div>
                    <div className='grid gap-1 grid-rows-2'>
                        {place?.photos?.[1] && (
                            <div className='flex-1'>
                                <img src={`http://localhost:4000/${place.photos[1]}`} className='w-full h-full object-cover rounded-3xl' alt={place.title} />
                            </div>
                        )}
                        {place?.photos?.[2] && (
                            <div className='flex-1'>
                                <img src={`http://localhost:4000/${place.photos[2]}`} className='w-full h-full object-cover rounded-3xl' alt={place.title} />
                            </div>
                        )}
                    </div>
                </div>
    <div className="flex mt-4  bg-gray-100">
                <div className="flex-1 p-4">
                    <h2 className="font-semibold text-2xl ">Description</h2>
                    <p className="break-words mr-2 text-justify">{place?.description}</p>
                    <div className="mt-8">
                        <span className="font-semibold">Check-in: </span>{place?.checkIn}<br />
                        <span className="font-semibold">Check-out: </span>{place?.checkOut}<br />
                        <span className="font-semibold">Max number of guests: </span>{place?.maxGuests}
                    </div>
                </div>
                <div className="bg-white shadow p-4 rounded-2xl w-1/3">
                    <div className="text-2xl text-center">
                        Price: ${place?.price} / night
                    </div>
                    <div className="flex">
                        <div className="py-1.5 px-4 border rounded-2xl m-1 mt-2">
                            <label>Check in:</label>
                            <input type="date" className="w-full" value={checkIn} onChange={e=> setCheckIn(e.target.value)}/>
                        </div>
                        <div className="py-1.5 px-4 border rounded-2xl m-1 mt-2">
                            <label>Check out:</label>
                            <input type="date" className="w-full" value={checkOut} onChange={e=> setCheckOut(e.target.value)} />
                        </div>
                    </div>
                    <div className="py-3 px-4 border rounded-2xl mx-1 mt-2">
                        <label>Number of guests:</label>
                        <input type="number" value={maxGuests} onChange={e=> setMaxGuests(e.target.value)} className="w-full border rounded-lg pl-2" />
                    </div>
                    {numberOfDays > 0 && (
                    <div className="py-3 px-4 border rounded-2xl mx-1 mt-2">
                        <label>Your Name:</label>
                        <input type="text" value={name} onChange={e=> setName(e.target.value)} className="w-full border rounded-lg pl-2" />
                    </div>
                    
                    )}
                    {numberOfDays > 0 && (
                    <div className="py-3 px-4 border rounded-2xl mx-1 mt-2">
                        <label>Your Phone Number:</label>
                        <input type="tel" value={phone} onChange={e=> setPhone(e.target.value)} className="w-full border rounded-lg pl-2" />
                    </div>
                    
                    )}
                    <button className="bg-red-500 mt-4 p-2 w-full rounded-2xl text-white" onClick={bookThisPlace}>
                        Book this place 
                        {numberOfDays > 0 && (
                            <span className="ml-1">for {numberOfDays} days, ${numberOfDays * place.price}.00</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SinglePage