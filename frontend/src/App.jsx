import './App.css'
import {Route, Routes} from 'react-router-dom';
import Index from './pages/Index.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Account from './pages/Account.jsx';
import { UserContextProvider } from './UserContext.jsx';
import Places from './pages/Places.jsx';



function App() {
  
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Index/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/account' element={<Account/>}></Route>
      <Route path='/account/bookings' element={<Account/>}></Route>
      <Route path='/account/accomodations' element={<Account/>}></Route>
      <Route path='/account/newplace' element={<Places/>}></Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
