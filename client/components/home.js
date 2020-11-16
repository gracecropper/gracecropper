import React from 'react'
import {Jumbotron, Container, Button} from 'react-bootstrap'

import './home.css'

const Home = () => {
  return (
    <div id="homePage">
      <Jumbotron
        fluid
        style={{
          backgroundColor: '#ffbb33',
          background: 'url("/img/crop2.gif")',
          backgroundRepeat: 'round'
        }}
      >
        <Container>
          <h2 style={{color: '#ffbb33', 'text-shadow': '1px 1px'}}>
            <i>Crops, Crop Tops, and Cropped Photos</i>
          </h2>
          <p style={{color: '#ffbb33'}}>
            GraceCropper, your one stop-shop for all things Crop!
          </p>
        </Container>
      </Jumbotron>

      <div id="homePageGrid">
        <div className="homePageImg">
          <img src="/img/crop.jpg" className="homePageImg" />
          <Button type="button" className="bannerButton" variant="warning">
            Crops
          </Button>
        </div>

        <div className="homePageImg">
          <img src="/img/croptop.jpg" className="homePageImg" />
          <Button type="button" className="bannerButton" variant="warning">
            Crop Tops
          </Button>
        </div>

        <div className="homePageImg">
          <img src="/img/croppedpic.png" className="homePageImg" />
          <Button type="button" className="bannerButton" variant="warning">
            Cropped Pictures
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
