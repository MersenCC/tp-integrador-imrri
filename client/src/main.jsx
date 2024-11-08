import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing.jsx'
import Details from './pages/Details/Details.jsx'
import Menu from './pages/Menu/Menu.jsx'
//import Reviews from './pages/Reviews/Reviews.jsx'
import Register from './pages/Register/Register.jsx'
import Login from './pages/Login/Login.jsx'
import Carrito from './pages/Carrito/Carrito.jsx'
import Admin from './pages/Admin/Admin.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/details" element={<Details/>}/>
        <Route path="/menu" element={<Menu/>}/>
        {/* <Route path="reviews" element={<Reviews/>}/> */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/carrito" element={<Carrito/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
