import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "./store/user/user.selector";
import axios from "axios";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RoleBaseRouting } from "./routes/RoleBaseRouting";
import { IsLoggedIN } from "./routes/IsLoggedIn";
import { setUser } from "./store/user/user.slice";
import Error404 from "./component/Utils/Error404";
// import Login from "./component/Forms/Login";
import Login from "./component/Login/Login";
import Profile from "./component/Profile";
import { ProjectSectionFaculty } from "./component/Faculty/Projects/ProjectSection";
import { ProjectSectionStudent } from "./component/Student/Project/ProjectSection";
import { NotificationsContainer } from "./component/Notification/NotificationsContainer";
import { UpdateProfileForm } from "./component/Forms/UpdateProfile";
import { Users } from "./component/Admin/Users/Users";
import { IndustryInternshipSection } from "./component/Admin/Internship Requests/IndustryInternshipSection";

export const App: React.FC = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.defaults.headers.common["auth-token"] = localStorage.getItem("token");
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    const userFetch = await axios.get(
      `http://localhost:8080/api/user/?id=${user.id}`
    );
    dispatch(setUser(userFetch.data.user));
  };

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/student/update-profile" element={<IsLoggedIN />}>
            <Route
              path="/student/update-profile"
              element={<UpdateProfileForm />}
            />
          </Route>
          <Route element={<RoleBaseRouting role={0} />}>
            <Route path="/admin" element={<Profile />} />
            <Route path="/admin/users" element={<Users />} />
            <Route
              path="/admin/industry-requests"
              element={<IndustryInternshipSection />}
            />
          </Route>
          <Route element={<RoleBaseRouting role={1} />}>
            <Route
              path="/faculty/problem-list"
              element={<ProjectSectionFaculty />}
            />
            <Route
              path="/faculty/updates"
              element={<NotificationsContainer />}
            />
            <Route path="/faculty" element={<Profile />} />
          </Route>
          <Route element={<RoleBaseRouting role={2} />}>
            <Route
              path="/student/problem-list"
              element={<ProjectSectionStudent />}
            />
            <Route
              path="/student/updates"
              element={<NotificationsContainer />}
            />
            <Route path="/student" element={<Profile />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </>
  );
};
