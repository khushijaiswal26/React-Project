import React from 'react'
import MainNav from './MainNav'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
        <MainNav/>
        <Outlet/>
    </div>
  )
}

export default RootLayout
