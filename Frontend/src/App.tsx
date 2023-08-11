import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProjectLists from './component/ProjectLists';
import Login from './component/Login';
import { RoleBaseRouting } from './routes/RoleBaseRouting';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationsContainer } from './component/NotificationsContainer';
import Error404 from './component/Error404';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from './store/user/user.selector';
import axios from 'axios';
import Profile from './component/Profile';
import { setUser } from './store/user/user.slice';

const App: React.FC = () => {
	const user = useSelector(userSelector);
	const dispatch = useDispatch();
	useEffect(() => {
		axios.defaults.headers.common['auth-token'] = localStorage.getItem('token');
	}, [user]);

	useEffect(() => {
		if (user) {
			fetchUser();
		}
	}, []);

	const fetchUser = async () => {
		const userFetch = await axios.get(
			`http://localhost:8080/api/user/${user.id}`
		);
		dispatch(setUser(userFetch.data.user));
	};

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
						<Route path='/faculty' element={<Profile />} />
					</Route>
					<Route element={<RoleBaseRouting role={2} />}>
						<Route path='/student/problem-list' element={<ProjectLists />} />
						<Route
							path='/student/updates'
							element={<NotificationsContainer />}
						/>
						<Route path='/student' element={<Profile />} />
					</Route>
					<Route path='*' element={<Error404 />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
