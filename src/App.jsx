import React, { Fragment, useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ClientMenu } from "./components/Client/ClientMenu";
import { ClientReservations } from "./components/Client/ClientReservations";
import { AdminMenu } from "./components/Admin/AdminMenu";
import GestionEstudiantes from "./components/Admin/GestionEstudiantes";
import EditUsuario from "./components/Admin/EditUsuario";
export function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/clientMenu" element={<ClientMenu />} />
          <Route exact path="/clientReservations" element={<ClientReservations />} />
          <Route exact path="/adminMenu" element={<AdminMenu />} />
          <Route exact path="/gestionEstudiantes" element={<GestionEstudiantes />} />
          <Route exact path="/edit/:id" element={<EditUsuario />} />


        </Routes>
      </div>
    </Router>
  );
}

//export default App;
