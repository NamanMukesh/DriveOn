import React from 'react'
import NavbarOwner from '../../components/Owner/NavbarOwner'
import SideBar from '../../components/Owner/SideBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col'>
        <NavbarOwner/>
        <div className='flex'>
            <SideBar/>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout