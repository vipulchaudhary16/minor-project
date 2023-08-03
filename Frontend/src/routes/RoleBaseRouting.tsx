import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../context/user.context';

interface RoleBaseRoutingProps {
	role: number;
}

export const RoleBaseRouting: React.FC<RoleBaseRoutingProps> = ({ role }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const { user } = useContext(UserContext);

	useEffect(() => {
		if (user) {
			if (user.role === role) {
				setIsAuthenticated(true);
			}
		}
	}, [user]);

	return (
		<>
			{isAuthenticated && user?.role === role ? (
				<Outlet />
			) : (
				<h1>You are not authorized to view this page</h1>
			)}
		</>
	);
};
