import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets';

function AppDownload() {
  return (
    <div className='app-download' id="app-download">
        <p>Download Our App Now</p>
        <div className="download-badges">
            <a href="#" aria-label="Download on Google Play">
                <img src={assets.play_store} alt="Google Play Store" />
            </a>
            <a href="#" aria-label="Download on App Store">
                <img src={assets.app_store} alt="Apple App Store" />
            </a>
        </div>
    </div>
  )
}

export default AppDownload