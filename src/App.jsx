import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'

const App = () => {
  return (
    <div id='root'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}  />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )  
}

export default App