import React from 'react';

import { AuthProvider } from './contexts/AuthContext';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Authentication from './pages/authantication';
import VideoMeet from './pages/VideoMeet';
import HomePage from './pages/home';
import HistoryPage from './pages/history';

function App() {
  

  return (
   <BrowserRouter>
    <AuthProvider>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/Auth' element={<Authentication/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/history' element={<HistoryPage/>}/>
      <Route path= '/:url' element= {<VideoMeet/>}/>

    </Routes>
   </AuthProvider>
   </BrowserRouter>
  )
}

export default App
