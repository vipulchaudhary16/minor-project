import { useEffect, useState } from 'react';
import { SentRequests } from './SentRequests';
import { ReceivedRequests } from './ReceivedRequests';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/user.selector';

export const NotificationsContainer = () => {
	const [activeTab, setActiveTab] = useState(0);
	const user = useSelector(userSelector);

	useEffect(() => {
		if (user.role === 1) {
			setActiveTab(1);
		} else if (user.role === 2) {
			setActiveTab(0);
		}
	}, [user]);

	const tabs = [
		{
			label: 'sent',
			role: 2,
		},
		{
			label: 'received',
			role: 1,
		},
	];

	return (
		<div className='max-h-screen p-[6rem] overflow-auto'>
			<div className='bg-[#ebf3fe] mb-[3rem] p-[2.5rem] rounded-lg'>
				<h2 className='text-[2.2rem] text-[#5d87ff] font-semibold'>
					Notifications
				</h2>
			</div>
			<div className='bg-white'>
				<div className='border-b border-gray-200'>
					<nav className='-mb-px flex space-x-8'>
						{tabs.map((tab, index) => (
							<>
								{user.role >= tab.role && (
									<button
										key={index}
										onClick={() => setActiveTab(index)}
										className={`text-[1.5rem] uppercase font-bold whitespace-nowrap py-4 px-1 border-b-2 ${
											activeTab === index
												? 'border-indigo-500 text-indigo-600'
												: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
										}`}
									>
										{tab.label}
									</button>
								)}
							</>
						))}
					</nav>
				</div>
			</div>
			<div className='flex flex-col gap-[2rem] mb-[2rem]'>
				{activeTab === 1 && <ReceivedRequests activeTab={activeTab} />}
				{activeTab === 0 && <SentRequests activeTab={activeTab} />}
			</div>
		</div>
	);
};
