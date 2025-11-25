
import React from 'react'


const Toast = ({toast}) => {
  return (
    <div>
        <p className='bg-primary/40  flex flex-1 p-3 items-center justify-center rounded-l-lg rounded-r-lg'>{toast}</p>
       
    </div>
  )
}

export default Toast