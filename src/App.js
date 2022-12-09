import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/modules/Header'
import Footer from './components/modules/Footer'
import Helper from './components/modules/Helper'
import Task from './components/modules/Task'
import CodeTip from './components/modules/CodeTip'
import ImgComp from './components/modules/ImgComp'
import ClipBoard from './components/modules/ClipBoard'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path='/' element={<Helper />} />
            <Route path='task' element={<Task />} />
            <Route path='img-comp' element={<ImgComp />} />
            <Route path='code-tip' element={<CodeTip />} />
            <Route path='clip-board' element={<ClipBoard />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    )
  }
}
