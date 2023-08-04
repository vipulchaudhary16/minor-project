import React, { FormEvent } from 'react';
import PopUp from '../PopUp';
import axios from 'axios';
import { toast } from 'react-toastify';

interface NotificationCardProps {
	notification: {
		_id: string;
		from: string;
		to: string;
		message_by_from: string;
		status: string;
		data: {
			problemId: string;
		};
		__v: number;
	};
}

const NotificationCardFaculty: React.FC<NotificationCardProps> = ({
	notification,
}) => {
	const [message, setMessage] = React.useState<string>('');
	const [status, setStatus] = React.useState<string>('');
	const [isPopUpOpen, setIsPopUpOpen] = React.useState<boolean>(false);

	const sendUpdate = async (e: FormEvent) => {
		e.preventDefault();
		const body = {
			message,
			status,
		};
		try {
			await axios.put(
				`http://localhost:8080/api/request/update/${notification._id}`,
				body
			);
			return toast.success('Update sent successfully');
		} catch (error) {
			console.log(error);
			return toast.error('Something went wrong');
		} finally {
			setIsPopUpOpen(false);
		}
	};

	const handleUpdate = (status: number) => {
		setStatus(status === 1 ? 'ACCEPTED' : 'REJECTED');
		setIsPopUpOpen(true);
	};
	return (
		<>
			<PopUp
				isOpen={isPopUpOpen}
				setIsOpen={setIsPopUpOpen}
				heading='send update to student'
			>
				<form className='flex flex-col' onSubmit={(e) => sendUpdate(e)}>
					<textarea
						placeholder='Enter your message to be sent to the faculty'
						className='border rounded p-2 mb-4 text-[1.3rem]'
						value={message}
						required
						onChange={(e) => setMessage(e.target.value)}
						cols={30}
						rows={10}
					/>
					<button className='bg-[#5d87ff] text-white rounded p-2'>Send</button>
				</form>
			</PopUp>
			<div className='border border-gray-300 rounded p-4 mb-4'>
				<div className='text-lg font-semibold mb-2'>
					{notification.from} sent you a request
				</div>
				<div className='text-gray-600 mb-4'>{notification.message_by_from}</div>
				<div className='text-gray-700 mb-2'>Status: {notification.status}</div>
				<div className='text-gray-700 mb-4'>
					Problem ID: {notification.data.problemId}
				</div>
				<div className='flex space-x-4'>
					<button
						onClick={() => handleUpdate(1)}
						className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded'
					>
						Accept
					</button>
					<button
						onClick={() => handleUpdate(0)}
						className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
					>
						Reject
					</button>
				</div>
			</div>
		</>
	);
};

export default NotificationCardFaculty;
