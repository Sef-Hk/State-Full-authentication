import React from 'react'
import Box from './components/Box'
import Form from './components/Form'
import './App.css'
function App() {
  return (
   <div className='compo-container'>
        <div className='compo-box'>
           <Box />
         </div>
         <div className='compo-form'>
           <Form />
         </div>
    </div>
  )
}

export default App