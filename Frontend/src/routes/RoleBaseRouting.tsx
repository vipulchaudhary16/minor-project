import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import SideNav from '../component/SideNav';

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
			<div className='h-screen grid grid-cols-12'>
				<div className='hidden lg:block lg:col-span-2'>
					<SideNav role={role} />
				</div>
				<div className='col-span-12 lg:col-span-10'>
					{isAuthenticated && user?.role === role ? (
						<Outlet />
					) : (
						<h1>You are not authorized to view this page</h1>
					)}
				</div>
			</div>
		</>
	);
};
