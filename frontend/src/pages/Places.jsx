import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import Perks from '../components/Perks';

const Places = () => {
    
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [photos, setPhotos] = useState([]);
    const [perks, setPerks]=useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(0);
    const { id } = useParams();
    

    function uploadPhoto(ev){
        const files = ev.target.files;
        const data = new FormData();
        for(let i=0; i<files.length; i++){
            data.append('photos', files[i]);
        }
        
        axios.post('http://localhost:4000/upload', data, {
            headers: {'Content-Type':'multipart/form-data'}
        }).then((response)=>{
            const {data:filenames} = response;
            setPhotos(prev=>{
                return [...prev, ...filenames];
            });
        });
       
    }

    async function handleformsub(ev){
        ev.preventDefault();
        
        const token = localStorage.getItem('token'); // Get token from local storage
        console.log("retrived from local storage ", token);
        if (id){
            await axios.put('http://localhost:4000/places/'+id, {
            
            title,
            description,
            address,
            photos,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests, 
            price
            
            }, {
                headers: {
                'Authorization': `Bearer ${token}`
            }
      });
    }else{
            await axios.post('http://localhost:4000/places', {
            title,
            description,
            address,
            photos,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
            
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
        
        navigate('/account/accomodations')
    }

    useEffect(()=>{
        if(!id) return
        axios.get(`http://localhost:4000/places/${id}`).then((response)=>{
            const {data} = response;
            setTitle(data.title);
            setDescription(data.description);
            setAddress(data.address);
            setPhotos(data.photos);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id])

     function removePhoto(photo) {
        setPhotos(prevPhotos => prevPhotos.filter(p => p !== photo));
    }

    
  return (
        <div>
            <Header/>
            <form className='p-6 ' onSubmit={handleformsub}>
                <h2 className='text-xl'>Title</h2>
                <input type='text' value={title} onChange={e=>setTitle(e.target.value)} className='w-full border-2 p-2 rounded-md mb-3' placeholder='Enter a catchy title for your place' />
                <h2 className='text-xl'>Address</h2>
                <input type='text'value={address} onChange={e=>setAddress(e.target.value)} className='w-full border-2 p-2 rounded-md mb-3' placeholder='Enter address' />
                <h2 className='text-xl'>Photos</h2>
                <div className='border-2 rounded-md w-1/3 p-8 mb-3'>
                    <label className='flex gap-2 text-xl'>
                        <input type='file' multiple className='hidden' onChange={uploadPhoto} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 ml-40">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>

                    Upload
                      
                    </label>
                    <div className='flex gap-2 flex-wrap mt-4'>
                        {photos.map((photo, index) => (
                            <div key={index} className='relative'>
                                <img src={`http://localhost:4000/${photo}`} alt="uploaded" className='w-32 h-32 object-cover ' />
                                <button className='absolute right-0 bottom-1' onClick={() => removePhoto(photo)} >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 bg-black opacity-65 text-white p-1" >
                                            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                            </svg>

                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <h2 className='text-xl'>Description</h2>
                <textarea value={description} onChange={e=>setDescription(e.target.value)} className='w-full border-2 p-2 rounded-md mb-3 h-[200px]' placeholder='Enter description of your place'></textarea>
                <h2 className='text-xl'>Perks</h2>
               
                <Perks selected={perks} onChange={setPerks}/>

                <h2 className='text-xl'>Extra Info</h2>
                <textarea value={extraInfo} onChange={e=>setExtraInfo(e.target.value)} className='w-full border-2 p-2 rounded-md mb-3 h-[200px]' placeholder='House Rules, terms and conditions, etc'></textarea>
                <h2 className='text-xl mb-2'>Check In & Check Out</h2>
                <div className='flex gap-2 mb-3'>
                    <div className='w-full '>
                        <h3>Check In Time</h3>
                        <input type='text' value={checkIn} onChange={e=>setCheckIn(e.target.value)} className='border-2 w-full rounded-md p-1.5' placeholder='13:00'></input>
                    </div>
                    <div className='w-full'>
                        <h3>Check Out Time</h3>
                        <input type='text' value={checkOut} onChange={e=>setCheckOut(e.target.value)} className='border-2 w-full rounded-md p-1.5' placeholder='22:00'></input>
                    </div>
                    <div className='w-full'>
                        <h3>No. of Guests</h3>
                        <input type='number' value={maxGuests} onChange={e=> setMaxGuests(e.target.value)} className='border-2 w-full rounded-md p-1.5 mb-3' placeholder='3'></input>
                    </div>
                    <div className='w-full'>
                        <h3>Price Per Night</h3>
                        <input type='number' value={price} onChange={e=> setPrice(e.target.value)} className='border-2 w-full rounded-md p-1.5 mb-3' placeholder='$50000'></input>
                    </div>
                </div>
                <button className='bg-red-500 p-2 rounded-md w-full text-white'>Save</button>
            </form>
        </div>
  )
}

export default Places