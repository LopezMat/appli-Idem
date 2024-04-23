import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeOffline = () => {
  return (
    <>
      <div className='w-screen bg-black'>
      </div>
      <Outlet />
    </>
  )
}

export default HomeOffline