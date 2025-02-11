import React from 'react'
import me from './images/me.jpeg'
import './styling/box.css'
function Box() {
  return (
    <div className='box-container'>
       <div className='box-header'>
            <div className="logo">
                <div className="carre">
                    <div className="circle"></div>
                    <div className="half-circle-red"></div> 
                    <div className="half-circle-yellow"></div> 
               </div>
            </div>
          <h3>Logo</h3>
        </div>
         <div className='text-container'>
              <h1>Connecting Talent To Opportunities</h1>
              <p>Discover endless opportunities on FreelanceConnect, where talented freelancers and businesses unite. Jump right in with us! </p>
        </div>
         <div className='box-bott-container'>
            <div className='elemt'>
                <p>As a freelancer, finding the right gigs can be challenging, but FreelanceHub made it simple. I love the personalized job recommendations and the ability to showcase my portfolio</p>
                <div className='user-container'>
                    <img src={me}  />
                    <div>
                        <h1>Sefasf abdelhak</h1>
                        <p>UI/UX Designer</p>
                    </div>
                </div>
            </div>
          </div>

    </div>
  )
}

export default Box
