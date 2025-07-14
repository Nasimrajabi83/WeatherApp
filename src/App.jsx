import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import LayoutProvider from './Context/context'

import Home from './Components/Home';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
   
     <LayoutProvider>
      <Routes>
      <Route path='/' element={<Navbar/>}>
      <Route index element={<Home/>}/>
        </Route>
      </Routes>
      </LayoutProvider>
   
  )
}

export default App
