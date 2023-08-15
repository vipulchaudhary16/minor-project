import axios from 'axios';
import { useEffect, useState } from 'react';
import { TRequest } from '../types/request.types';
import { Request } from './Request';

type ReceivedRequestsProps = {
	activeTab: number;
};

export const ReceivedRequests: React.FC<ReceivedRequestsProps> = ({
	activeTab,
}) => {
	const [requests, setRequests] = useState<{
		groupRequests: TRequest[];
		projectRequests: TRequest[];
	}>({
		groupRequests: [],
		projectRequests: [],
	});
	useEffect(() => {
		getNotifications();
	}, [activeTab]);

	const getNotifications = async () => {
		try {
			const res = await axios.get(
				'http://localhost:8080/api/project-request?type=received'
			);
			setRequests(res.data);
			console.log(res.data)
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='p-4'>
			<p className='font-bold text-xl underline'>Group Requests</p>
			{requests.groupRequests.map((request) => (
				<Request request={request} requestType='received' />
			))}
			<p className='font-bold text-xl underline'>Project Requests</p>
			{requests.projectRequests.map((request) => (
				<Request request={request} requestType='received' />
			))}
		</div>
	);
};
