import React from 'react';
import mobileImage from '../assets/mobile.png';
import { Link } from 'react-router-dom';


function LandingPage() {
    
    return (
        
        <div className="landingPage">
            <nav className="navbar">
                <div className="logo">
                    <h1>Apna Video Call</h1>
                </div>
                <div className="links">
                    <Link to="/nvwnn" className='guestBtn'>Join as Guest</Link>
                    <Link to="/Auth" className='registerBtn'>Register</Link>
                    <Link to="/Auth" className='loginBtn'>Login</Link>
                </div>
            </nav>

            <div className="content">
                <div className="leftContent">
                    <h1><span style={{color:"orange"}}>Connect</span> with your <br /> Loved Ones</h1>
                    <p>Cover a distance with high-quality video calls.</p>
                    <Link to="/Auth" className="getStartedBtn">Get Started</Link>
                </div>
                <div className="rightContent">
                    <img src={mobileImage} alt="Video Call Illustration" />
                </div>
            </div>

        </div>
        
    );
}

export default LandingPage;