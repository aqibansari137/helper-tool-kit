import React, { Component } from 'react'
import Footer from './components/modules/Footer'
import Header from './components/modules/Header'
import NbspRm from './components/modules/NbspRm'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <NbspRm />
        </div>
        <Footer />
      </div>
    )
  }
}
