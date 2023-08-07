import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import ProjectLists from './component/ProjectLists';
import Notifications from './component/Notifications';
import Login from './component/Login';
import { RoleBaseRouting } from './routes/RoleBaseRouting';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationsContainer } from './component/NotificationsContainer';
import Error404 from './component/Error404';
import { useSelector } from 'react-redux';
import { userSelector } from './store/user/user.selector';
import axios from 'axios';

const App: React.FC = () => {
	const user = useSelector(userSelector);

	useEffect(() => {
		axios.defaults.headers.common['auth-token'] = localStorage.getItem('token');
	}, [user]);
	return (
		<>
			<ToastContainer />
			<Router>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route element={<RoleBaseRouting role={1} />}>
						<Route path='/faculty/problem-list' element={<ProjectLists />} />
						<Route
							path='/faculty/updates'
							element={<NotificationsContainer />}
						/>
						<Route path='/faculty' element={<Home />} />
					</Route>
					<Route element={<RoleBaseRouting role={2} />}>
						<Route path='/student/problem-list' element={<ProjectLists />} />
						<Route
							path='/student/updates'
							element={<NotificationsContainer />}
						/>
						<Route path='/student' element={<Home />} />
					</Route>
					<Route path='*' element={<Error404 />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
