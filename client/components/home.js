import React from 'react'
import {Jumbotron, Container, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {Link} from 'react-router-dom'

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
          <h2
            style={{
              color: '#ffbb33',
              textShadow: '1px 1px',
              fontSize: '40px'
            }}
          >
            <i>Crops, Crop Tops, and Cropped Photos</i>
          </h2>
          <p style={{color: 'white', fontSize: '30px'}}>
            GraceCropper, your one stop-shop for all things Crop!
          </p>
        </Container>
      </Jumbotron>

      <div id="homePageGrid">
        <div className="homePageImg">
          <img src="/img/crop.jpg" className="homePageImg" />
          <Link to="/products#/?filter=crops">
            <Button type="button" className="bannerButton" variant="warning">
              Crops
            </Button>
          </Link>
        </div>

        <div className="homePageImg">
          <img src="/img/croptop.jpg" className="homePageImg" />
          <Link to="/products#/?filter=croppedtops">
            <Button type="button" className="bannerButton" variant="warning">
              Crop Tops
            </Button>
          </Link>
        </div>

        <div className="homePageImg">
          <img src="/img/croppedpic.png" className="homePageImg" />
          <Link to="/products#/?filter=croppedpictures">
            <Button type="button" className="bannerButton" variant="warning">
              Cropped Pictures
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
