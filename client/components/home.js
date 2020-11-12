import React from 'react'

import './home.css'

// General note: Try to have a consistency between all your file names as well as the names of your components

const Home = () => (
  <div id="homePage">
    <div id="">
      <h2>Crops, Crop Tops, and Cropped Photos</h2>
    </div>

    <div id="homePageGrid">
      <div className="homePageImg">
        <img src="/crops.jpeg" className="homePageImg" />
        <button type="button" className="bannerButton">
          Crops
        </button>
      </div>

      <div className="homePageImg">
        <img src="/croptop.jpg" className="homePageImg" />
        <button type="button" className="bannerButton">
          Crop Tops
        </button>
      </div>
    </div>
  </div>
)

export default Home
