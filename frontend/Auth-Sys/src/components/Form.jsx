import React from 'react'
import SkillsForm from './handalers/SkillsForm'
import CountryCityDropdown from './handalers/CountryCityDropdown'
import DateOfBirth from './handalers/DateOfBirth'
import PhoneNumberInput from './handalers/PhoneNumberInput'
import EmailInp from './handalers/EmailInp'
import PasswordInput from './handalers/PasswordInput'
import './styling/form.css'
function Form() {
  return (
    <div className='form-container'>
      <div className='the-head'> 
         <h1>Create your account with us below</h1>
         <p>Already have an account?<a href="#"> Login</a></p>
      </div>
      <form action="" className='form-form'>
        <div className='form-header'>
            <label htmlFor="">You're creating an account as?</label>
            <div className='box-top'>
                  <div className='box-form'>
                     <input type="radio" name="role" id="designer" value="designer" />
                     <p>As a Designer</p>
                  </div>
                  <div className='box-form'>
                     <input type="radio" name="role" id="developer" value="developer" />
                     <p>As a Developer</p>
                  </div>
            </div>
        </div>
        <div className='input-box'>
                 <div className='form-input'>
                      <label htmlFor="">Full Name</label>
                      <input type="text" required minLength={2} maxLength={50}/>
                 </div>     
                 <div className='form-skills'>
                       <EmailInp />
                 </div>
                 <div className='form-skills'>
                       <PasswordInput />
                 </div>
                 <div className='form-skills'>
                       <SkillsForm />
                 </div>
                 <div className='form-skills'>
                       <CountryCityDropdown />
                 </div>
                 <div className='form-skills'>
                       <DateOfBirth />
                 </div>
                 <div className='form-skills'>
                       <PhoneNumberInput />
                 </div>
                 
                

                 <button type='submit' className='submit-button'>Create Account</button>
         </div>       
      </form>
    </div>
  )
}

export default Form