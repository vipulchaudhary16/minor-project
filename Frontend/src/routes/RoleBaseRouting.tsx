import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../component/SideNav';
import UnauthorizedPage from '../component/Unauthorised';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/user/user.selector';

interface RoleBaseRoutingProps {
	role: number;
}

export const RoleBaseRouting: React.FC<RoleBaseRoutingProps> = ({ role }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const  user  = useSelector(userSelector)

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
						<UnauthorizedPage />
					)}
				</div>
			</div>
		</>
	);
};
