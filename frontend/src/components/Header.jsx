import { Link } from 'react-router-dom';

function Header({ user }){
    return(
        <div>
          {user? (
            <header className=' flex items-center justify-between p-6 shadow-sm'>
        <a href="" className="logo flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10 -rotate-90 text-red-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
          <span className='font-comfortaa font-bold text-red-500 text-2xl p-1'>airbnb</span>
        </a>

        <div className='flex gap-3 border p-2 rounded-3xl  shadow-lg'>
          <div className='ml-3 mr-3 font-bold'>Anywhere <span className='ml-8 font-light'>|</span></div>
          <div className='ml-3 mr-3 font-bold'>Any Week <span className='ml-8 font-light'>|</span></div>
          <div className='ml-3 mr-3 font-bold'>Add guests </div>
          <button className='ml-3 mr-1 text-white bg-red-500 rounded-full p-1.5'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>

        <Link to={'/login'}className='flex gap-2 border p-2 rounded-3xl  shadow-lg'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <span className='flex items-center'>{user.name}</span>
        </Link>


      </header>
          ):(
            <header className=' flex items-center justify-between p-6 shadow-sm'>
        <a href="" className="logo flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10 -rotate-90 text-red-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
          <span className='font-comfortaa font-bold text-red-500 text-2xl p-1'>airbnb</span>
        </a>

        <div className='flex gap-3 border p-2 rounded-3xl  shadow-lg'>
          <div className='ml-3 mr-3 font-bold'>Anywhere <span className='ml-8 font-light'>|</span></div>
          <div className='ml-3 mr-3 font-bold'>Any Week <span className='ml-8 font-light'>|</span></div>
          <div className='ml-3 mr-3 font-bold'>Add guests </div>
          <button className='ml-3 mr-1 text-white bg-red-500 rounded-full p-1.5'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>

        <Link to={'/login'}className='flex gap-2 border p-2 rounded-3xl  shadow-lg'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <span className='flex items-center'></span>
        </Link>


      </header>
          )}
      
    </div>
    );
}

export default Header;