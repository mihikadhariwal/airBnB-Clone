import './App.css'
import {Route, Routes} from 'react-router-dom';
import Index from './pages/Index.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Index/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
    </Routes>
  )
}

export default App
