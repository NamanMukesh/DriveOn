import React, { useState } from 'react'
import Navbar from './components/Navbar'
import {Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CarDetails from './pages/CarDetails'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
import Layout from './pages/Owner/Layout'
import ManageBooking from './pages/Owner/ManageBooking'
import AddCar from './pages/Owner/AddCar'
import ManageCar from './pages/Owner/ManageCar'
import Dashboard from './pages/Owner/Dashboard'

export const App = () => {

  const [setShowlogin] = useState(false)
  const isOwnerPath = useLocation().pathname.startsWith('/owner')

  return (
    <>
      {!isOwnerPath && <Navbar setShowlogin={setShowlogin}/>}

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cars-details/:id' element={<CarDetails/>}/>
      <Route path='/cars' element={<Cars/>}/>
      <Route path='/my-bookings' element={<MyBookings/>}/>
      <Route path='/owner' element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='add-car' element={<AddCar/>}/>
        <Route path='manage-cars' element={<ManageCar/>}/>
        <Route path='manage-bookings' element={<ManageBooking/>}/>
      </Route>
    </Routes>

    {!isOwnerPath && <Footer/>}

    </>
  )
}
export default App