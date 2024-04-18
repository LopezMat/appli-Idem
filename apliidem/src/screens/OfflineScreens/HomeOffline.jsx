import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeOffline = () => {
  return (
    <>
      <div className='w-screen bg-black'>
        <h1>Vous etes déconnecter</h1>
      </div>
      <Outlet />
    </>
  )
}

export default HomeOffline