import React, { Component } from 'react'
import Footer from './components/modules/Footer'
import Header from './components/modules/Header'
import Helper from './components/modules/Helper'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Helper />
        </div>
        <Footer />
      </div>
    )
  }
}
