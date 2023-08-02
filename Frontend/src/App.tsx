import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './component/MainLayout';
import Home from './component/Home';
import ProjectLists from './component/ProjectLists';
import Notifications from './component/Notifications';
import Login from './component/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projectlist" element={<ProjectLists />} />
          <Route path="/notify" element={<Notifications />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
