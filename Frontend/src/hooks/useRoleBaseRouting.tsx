import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationHookProps {
	role: number; 
}

export const useRoleBasedNavigation = ({ role }: NavigationHookProps) => {
	const navigate = useNavigate();

	useEffect(() => {
		switch (role) {
			case 1:
				navigate('/faculty');
				break;
			case 2:
				navigate('/student');
				break;
			case 0:
				navigate('/admin');
				break;
			default:
				navigate('/');
				break;
		}
	}, [navigate]);
};
