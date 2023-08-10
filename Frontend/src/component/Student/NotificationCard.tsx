import React from 'react';
import { NotificationCardProps } from '../../types/notification.types';

const NotificationCardStudent: React.FC<NotificationCardProps> = ({
	notification,
}) => {
	return (
		<>
			<div className='card p-[2.5rem] rounded-lg text-[#5A6A85]'>
				<div className='flex flex-col gap-[.5rem]'>
					<div className='text-[1.3rem] font-semibold'>
						Request To: {''}
						<span className='text-[1.3rem] font-normal'>
							{notification.toUser.name}
						</span>
					</div>
					<div className='text-[1.3rem] font-semibold'>
						Update:{' '}
						<span className='text-[1.3rem] font-normal'>
							{' '}
							{notification?.message_by_to || 'NA'}{' '}
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
						Problem Statement:{' '}
						<span className='text-[1.3rem] font-normal'>
							{/* Display the problem statement, adding an ellipsis if it's longer than 60 characters */}
							{notification.problemStatement.statement.length > 60
								? `${notification.problemStatement.statement.slice(0, 60)}...`
								: notification.problemStatement.statement}
						</span>
					</div>
				</div>
				<div className='mt-[1rem]'>
					<button className='bg-red-500 hover:bg-red-600 text-white font-semibold py-[.8rem] px-[1.6rem] rounded'>
						Withdraw
					</button>
				</div>
			</div>
		</>
	);
};

export default NotificationCardStudent;
