import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {NavBar, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
