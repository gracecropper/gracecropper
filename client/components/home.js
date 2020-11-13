import React from 'react'

import './home.css'

const Home = () => (
  <div id="homePage">
    <div id="">
      <h2>Crops, Crop Tops, and Cropped Photos</h2>
    </div>

    <div id="homePageGrid">
      <div className="homePageImg">
        <img src="/img/crop.jpg" className="homePageImg" />
        <button type="button" className="bannerButton">
          Crops
        </button>
      </div>

      <div className="homePageImg">
        <img src="/img/croptop.jpg" className="homePageImg" />
        <button type="button" className="bannerButton">
          Crop Tops
        </button>
      </div>
    </div>
  </div>
)

export default Home
