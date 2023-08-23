import axios from 'axios';
import { useEffect, useState } from 'react';
import { TRequest } from '../../types/request.types';
import { Request } from './Request';
import { toast } from 'react-toastify';
import { Loader } from '../Utils/Loader';

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
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		getNotifications();
	}, [activeTab]);

	const getNotifications = async () => {
		setLoading(true);
		try {
			const res = await axios.get(
				'http://localhost:8080/api/project-request?type=received'
			);
			setRequests(res.data);
		} catch (error: any) {
			toast.error(error.response.data);
		} finally {
		}
		setLoading(false);
	};

	return (
		<div className='py-4'>
			<div className='bg-[#ebf3fe] p-[1.5rem] rounded-lg'>
				<h2 className='text-[1.5rem] text-[#5d87ff] font-semibold'>
					Group Requests
				</h2>
			</div>
			{loading ? (
				<Loader heading='Please wait!!' />
			) : requests.groupRequests.length > 0 ? (
				requests.groupRequests.map((request) => (
					<Request request={request} requestType='received' onSuccess = {getNotifications}/>
				))
			) : (
				<p className='font-bold text-xl p-4'>No Group Requests</p>
			)}
			<div className='bg-[#ebf3fe] p-[1.5rem] rounded-lg'>
				<h2 className='text-[1.5rem] text-[#5d87ff] font-semibold'>
					Project Requests
				</h2>
			</div>
			{loading ? (
				<Loader heading='Please wait!!' />
			) : requests.projectRequests.length > 0 ? (
				requests.projectRequests.map((request) => (
					<Request request={request} requestType='received' onSuccess = {getNotifications}/>
				))
			) : (
				<p className='font-bold text-xl p-4'>No Project Requests</p>
			)}
		</div>
	);
};
