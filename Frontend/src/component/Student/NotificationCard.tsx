import React from 'react';

interface NotificationCardProps {
	notification: {
		_id: string;
		from: string;
		to: string;
		message_by_from: string;
    message_by_to: string;
		status: string;
		data: {
			problemId: string;
		};
		__v: number;
	};
}

const NotificationCardStudent: React.FC<NotificationCardProps> = ({
	notification,
}) => {
	return (
		<>
			<div className='border border-gray-300 rounded p-4 mb-4'>
				<div className='text-lg font-semibold mb-2'>
					You sent request to {notification.from}
				</div>
				<div className='text-gray-600 mb-4'>Update: {notification?.message_by_to}</div>
				<div className='text-gray-700 mb-2'>Status: {notification.status}</div>
				<div className='text-gray-700 mb-4'>
					Problem ID: {notification.data.problemId}
				</div>
				<div className='flex space-x-4'>
					<button className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'>
						Withdraw
					</button>
				</div>
			</div>
		</>
	);
};

export default NotificationCardStudent;
