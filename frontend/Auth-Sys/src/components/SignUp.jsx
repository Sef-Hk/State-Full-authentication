import React from 'react'
import Box from './Box'
import Form from './Form'
// import '../App.css'
import "./signup.css"
function SignUp() {
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

export default SignUp