import React, { FormEvent } from 'react';
import PopUp from '../PopUp';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NotificationCardProps } from '../../types/notification.types';

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
			<PopUp isOpen={isPopUpOpen} setIsOpen={setIsPopUpOpen} heading=''>
				<form className='flex flex-col' onSubmit={(e) => sendUpdate(e)}>
					<div className='mb-[2rem]'>
						<label
							htmlFor='message'
							className='block text-[1.3rem] font-semibold mb-[1rem]'
						>
							Message
						</label>
						<textarea
							placeholder='Enter your message to be sent to the faculty'
							className='w-full px-[1.2rem] py-[.8rem] border rounded-md focus:outline-none focus:ring-1 focus:ring-[#557deb] text-[1.2rem]'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							cols={40}
							rows={8}
							required
						/>
					</div>
					<div className='text-center'>
						<button
							type='submit'
							className='w-full bg-[#5d87ff] text-white text-[1.3rem] font-semibold py-[1rem] px-[1.6rem] rounded-md hover:bg-[#557deb]'
						>
							Send
						</button>
					</div>
				</form>
			</PopUp>
			<div className='card p-[2.5rem] rounded-lg text-[#5A6A85]'>
				<div className='flex flex-col gap-[.5rem]'>
					<div className='text-[1.3rem] font-semibold'>
						Request From:{' '}
						<span className='text-[1.3rem] font-normal'>
							{' '}
							{notification.fromUser.name}{' '}
						</span>
					</div>
					<div className='text-[1.3rem] font-semibold'>
						Message:{' '}
						<span className='text-[1.3rem] font-normal'>
							{' '}
							{notification?.message_by_from || 'NA'}{' '}
						</span>
					</div>
					<div className='text-[1.3rem] font-semibold'>
						Status:{' '}
						<span className='text-[1.3rem] font-normal'>
							{' '}
							{notification.status}{' '}
						</span>
					</div>
					<div className='text-[1.3rem] font-semibold'>
						Problem ID:{' '}
						<span className='text-[1.3rem] font-normal'>
							{/* Display the problem statement, adding an ellipsis if it's longer than 60 characters */}
							{notification.problemStatement.statement.length > 60
								? `${notification.problemStatement.statement.slice(0, 60)}...`
								: notification.problemStatement.statement}
						</span>
					</div>
				</div>
				<div className='mt-[1rem] flex gap-[1rem]'>
					<button
						onClick={() => handleUpdate(1)}
						className='bg-green-500 hover:bg-green-600 text-white font-semibold py-[.8rem] px-[1.6rem] rounded'
					>
						Accept
					</button>
					<button
						onClick={() => handleUpdate(0)}
						className='bg-red-500 hover:bg-red-600 text-white font-semibold py-[.8rem] px-[1.6rem] rounded'
					>
						Reject
					</button>
				</div>
			</div>
		</>
	);
};

export default NotificationCardFaculty;
