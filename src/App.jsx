import React, { Fragment, useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ClientMenu } from './components/Client/ClientMenu';
import { AdminMenu } from './components/Admin/AdminMenu';


export function App() {


  return (
  <Router>
    <div className="App">
      <Routes>

        <Route exact path = "/" element = {<Login/>}/>
        <Route exact path = "/register" element = {<Register/>}/>
        <Route exact path = "/clientMenu" element = {<ClientMenu/>}/>
        <Route exact path = "/adminMenu" element = {<AdminMenu/>}/>

      </Routes>

    </div>
  </Router>
  );
}

//export default App;
