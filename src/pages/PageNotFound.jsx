import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center h-screen space-y-4'>
        <div
              onClick={() => navigate("/")}
              className="text-custom-blue-3 font-bold text-9xl cursor-pointer"
            >
              Si
              <span className="text-custom-blue-1">Tix</span>
            </div>
        <h1 className='text-4xl'>404</h1>
        <h3>Page Not Found</h3>
    </div>
  )
}

export default PageNotFound