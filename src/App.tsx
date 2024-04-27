import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import NewBonus from './components/NewBonus/NewBonus'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/NewBonus' element={<NewBonus/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App