import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./component/Profile";
import ProjectLists from "./component/ProjectLists";
import Login from "./component/Login";
import { NotificationsContainer } from "./component/NotificationsContainer";
import { RoleBaseRouting } from "./routes/RoleBaseRouting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<RoleBaseRouting role={1} />}>
            <Route path="/faculty" element={<Profile />} />
            <Route path="/faculty/problem-list" element={<ProjectLists />} />
            <Route
              path="/faculty/updates"
              element={<NotificationsContainer />}
            />
          </Route>
          <Route element={<RoleBaseRouting role={2} />}>
            <Route path="/student" element={<Profile />} />
            <Route path="/student/problem-list" element={<ProjectLists />} />
            <Route
              path="/student/updates"
              element={<NotificationsContainer />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
