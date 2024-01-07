import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';

const App = () => {
  const [progress,setProgress] =useState(0)
 
  const setProgress1 = () =>{
    setProgress(progress)
  }
  
    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        height={2}
        progress={progress}
      />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress1} key='general' pageSize={15} country='in' category='general' />} />
          <Route exact path="/sports" element={<News setProgress={setProgress1} key='sports' pageSize={15} country='in' category='sports' />} />
          <Route exact path="/business" element={<News setProgress={setProgress1} key='business' pageSize={15} country='in' category='business' />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress1} key='entertainment' pageSize={15} country='in' category='entertainment' />} />
          <Route exact path="/health" element={<News setProgress={setProgress1} key='health' pageSize={15} country='in' category='health' />} />
          <Route exact path="/science" element={<News setProgress={setProgress1} key='science' pageSize={15} country='in' category='science' />} />
          <Route exact path="/technology" element={<News setProgress={setProgress1} key='technology' pageSize={15} country='in' category='technology' />} />
        </Routes>
        </Router>
      </div>
    )
  }


export default App
