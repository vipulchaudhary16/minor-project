import axios from 'axios';
import { useEffect, useState } from 'react';
import { TRequest } from '../types/request.types';
import { Request } from './Request';
import { toast } from 'react-toastify';

type SentRequestsProps = {
	activeTab: number;
};

export const SentRequests: React.FC<SentRequestsProps> = ({ activeTab }) => {
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
				'http://localhost:8080/api/project-request?type=sent'
			);
			setRequests(res.data);
		} catch (error: any) {
			toast.error(error.response.data);
		}
	};
	return (
		<div className='p-4'>
			<p className='font-bold text-xl underline'>Group Requests</p>
			{requests.groupRequests.length > 0 ? (
				requests.groupRequests.map((request) => (
					<Request request={request} requestType='sent' />
				))
			) : (
				<p>No Group Requests</p>
			)}
			<p className='font-bold text-xl underline'>Project Requests</p>
			{requests.groupRequests.length > 0 ? (
				requests.projectRequests.map((request) => (
					<Request request={request} requestType='sent' />
				))
			) : (
				<p>No Project Requests</p>
			)}
		</div>
	);
};
