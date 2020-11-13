import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

import './home.css'

const Home = () => {
  return (
    <div id="homePage">
      <Jumbotron fluid>
        <h2>
          <i>Crops, Crop Tops, and Cropped Photos</i>
        </h2>
        <p>GraceCropper, your one stop-shop for all things Crop!</p>
      </Jumbotron>

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

        <div className="homePageImg">
          <img src="/img/croppedpic.png" className="homePageImg" />
          <button type="button" className="bannerButton">
            Cropped Pictures
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
