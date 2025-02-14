import React from 'react'
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './components/Home'
import './App.css'
function App() {
  return (
    <Router>

    <Routes>
         <Route path="/" element={<SignUp />}/>
         <Route path="/login" element={<Login />}/>
         <Route path="/home" element={<Home />}/>
         
    </Routes>

</Router>
  )
}

export default App