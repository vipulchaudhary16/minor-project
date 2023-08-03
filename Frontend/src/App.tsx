import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import ProjectLists from './component/Student/ProjectLists';
import Notifications from './component/Notifications';
import Login from './component/Login';
import { RoleBaseRouting } from './routes/RoleBaseRouting';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
	return (
		<>
			<ToastContainer />
			<Router>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route element={<RoleBaseRouting role={1} />}>
					<Route path='/faculty/problem-list' element={<ProjectLists />} />
					<Route path='/faculty/updates' element={<Notifications />} />
					<Route path='/faculty' element={<Home />} />
				</Route>
				<Route element={<RoleBaseRouting role={2} />}>
						<Route path='/student/problem-list' element={<ProjectLists />} />
						<Route path='/student/updates' element={<Notifications />} />
							<Route path='/student' element={<Home />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
};

export default App;
