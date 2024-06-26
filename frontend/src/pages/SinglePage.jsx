import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';
import axios from 'axios';

const SinglePage = () => {
    const {id} = useParams();
    const [place, setPlace] = useState({});

    useEffect(()=>{
        if(!id){
            return;
        }else{
            axios.get(`http://localhost:4000/singleplace/${id}`).then((response)=>{
                setPlace(response.data);
            })
        }
    }, [id])
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
                    <h2 className="font-semibold text-2xl text-justify">Description</h2>
                    <p className="break-words mr-2">{place?.description}</p>
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
                            <input type="date" className="w-full" />
                        </div>
                        <div className="py-1.5 px-4 border rounded-2xl m-1 mt-2">
                            <label>Check out:</label>
                            <input type="date" className="w-full" />
                        </div>
                    </div>
                    <div className="py-3 px-4 border rounded-2xl mx-1 mt-2">
                        <label>Number of guests:</label>
                        <input type="number" className="w-full" />
                    </div>
                    <button className="bg-red-500 mt-4 p-2 w-full rounded-2xl text-white">
                        Book this place
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SinglePage