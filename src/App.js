import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Home from './pages/Home.js';
import Create from './pages/CreateBoba.js';
import MyBoba from './pages/MyBoba.js';

import { AuthProvider } from './context/auth';
// import AuthRoute from './util/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/createboba" element={<Create />}></Route>
          <Route exact path='/myboba/:userId' element={<MyBoba />}></Route>
          {/* <AuthRoute exact path='/home' component={Home}/> */}
        </Routes>
      </BrowserRouter>      
    </AuthProvider>

  );
}

export default App;
