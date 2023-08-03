import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './component/MainLayout';
import Home from './component/Home';
import ProjectLists from './component/ProjectLists';
import Notifications from './component/Notifications';
import Login from './component/Login';
import { RoleBaseRouting } from './routes/RoleBaseRouting';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route element={<RoleBaseRouting role={2} />}>
					<Route path='/student/problem-list' element={<ProjectLists />} />
					<Route path='/student/updates' element={<Notifications />} />
					{/* Profile */}
					<Route path='/student' element={<Notifications />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
