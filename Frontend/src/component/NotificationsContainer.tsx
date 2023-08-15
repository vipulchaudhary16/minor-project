import { useState } from 'react';
import { SentRequests } from './SentRequests';
import { ReceivedRequests } from './ReceivedRequests';

export const NotificationsContainer = () => {
	const [activeTab, setActiveTab] = useState(0);

	const tabs = [
		{
			label: 'Sent',
		},
		{
			label: 'Received',
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
							<button
								key={index}
								onClick={() => setActiveTab(index)}
								className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-[1.4rem] ${
									activeTab === index
										? 'border-[#5d87ff] text-[#5d87ff]'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
								}`}
							>
								{tab.label}
							</button>
						))}
					</nav>
				</div>
			</div>
			<div className='flex flex-col gap-[2rem] mb-[2rem]'>
				{activeTab === 0 && <SentRequests activeTab={activeTab} />}
				{activeTab === 1 && <ReceivedRequests activeTab={activeTab} />}
			</div>
		</div>
	);
};
