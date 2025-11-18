import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/orders/Orders'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="app-content">
        <Sidebar/>
        <div className="main-content">
          <Routes>
            <Route path='/add' element={<Add/>}/>
            <Route path='/list' element={<List/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/' element={<Add/>}/> {/* Route par défaut */}
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App