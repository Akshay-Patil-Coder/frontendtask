import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Newregister';
import Newallusers from './Newallusers';
import Navbar from './Navbar';
import Logout from './Logout';
import Newallroles from './Newallroles';
import Newcreaterole from './Newcreaterole';
import Newhome from './Newhome';
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={
            <ProtectedRoute component={Register} />
          }
        />
        <Route
          path="/newhome"
          element={
            <ProtectedRoute component={Newhome} />
          }
        />
        <Route
          path="/allusers"
          element={
            <ProtectedRoute component={Newallusers} />
          }
        />
        <Route
          path="/allroles"
          element={
            <ProtectedRoute component={Newallroles} />
          }
        />
        <Route
          path="/createrole"
          element={
            <ProtectedRoute component={Newcreaterole} />
          }
        />
        <Route
          path="/nav"
          element={
            <ProtectedRoute component={Navbar} />
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute component={Logout} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
