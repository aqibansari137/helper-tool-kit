import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/modules/Header'
import Footer from './components/modules/Footer'
import Helper from './components/modules/Helper'
import Task from './components/modules/Task'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route index element={<Helper />} />
            <Route path='task' element={<Task />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    )
  }
}
