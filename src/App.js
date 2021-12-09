import './App.css';
import React, { useState } from 'react';
import { Card, Navbar } from 'react-bootstrap';
import {Routes, Route,Navigate} from "react-router-dom"
import Dashboard from "./Admin/Dashboard/Dashboard"
import Admin from "./Admin"
import NavComp from './NavComp/NavComp';
import {auth} from "./config/firebase"

function App() {
  return (
    <div className="App">
      <NavComp/>
      <Routes>
        <Route exact path="/*" element={<Dashboard/>}/>
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="/login" element={<Navigate to="/admin/login" />}/>
      </Routes>
        <Card>
        </Card>
    </div>
  );
}

export default App;
