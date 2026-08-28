import React from 'react'
import { Link } from 'react-router-dom'

function Button() {
  return (
    <Link className='flex justify-center mt-5 ml-8 items-center w-60 h-8 shadow border border-zinc-300 rounded-2xl'
    to={"/detail"} >
        View Details
    </Link>
  )
}

export default Button