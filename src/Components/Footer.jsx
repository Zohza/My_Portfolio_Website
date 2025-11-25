import React from 'react'
import { ArrowUp } from 'lucide-react'

const Footer = () => {
  return (
    <footer >
        <a href="#home" className='flex justify-end absolute left-[90%] transform -translate-x-1/2 flex flex-col animate-bounce bottom-8"'>
            <ArrowUp  size={20} className='rounded-full bg-primary/20 w-9 h-9'/>
           <p className='text-sm '> Back To Home</p>
        </a>
        <div className="bg-primary/50 w-full h-20 mt-12 py-5 font-semibold">
        <p>&copy; BoluCodes {new Date().getFullYear()} <br />
            All Rights Reserved</p>
        </div>
    </footer>
  )
}

export default Footer