import React from 'react';
import { GroupData } from '../../types/group.types';
import { convertTimeIntoIST } from '../../utilFunctions/functions';

interface Props {
	group: GroupData;
}

export const GroupDetailsCard: React.FC<Props> = ({ group }) => {
	return (
		<div>
			<div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
				<div className='bg-gray-200 text-lg font-semibold p-4'>
					Group Information
				</div>

				<div className='p-4'>
					<p className='text-gray-600'>
						<span className='font-semibold'>Group Number:</span>{' '}
						{group.groupNumber}
					</p>
					<p className='text-gray-600'>
						<span className='font-semibold'>Created At:</span>{' '}
						{convertTimeIntoIST(group.createdAt)}
					</p>

					<div className='mt-4'>
						<p className='text-lg font-semibold'>Group Members:</p>
						<ol className='list-disc list-inside text-gray-600'>
							{group.groupMembersData.map((member) => (
								<li key={member._id}>
									{member.name} ({member.rollNo})
								</li>
							))}
						</ol>
					</div>

					<div className='mt-4'>
						<p className='text-lg font-semibold'>Created By:</p>
						<p className='text-gray-600'>{group.createdByData.name}</p>
					</div>

					{/* <div className='mt-4'>
						<p className='text-lg font-semibold'>Selected Problem Statement:</p>
						<p className='text-gray-600'>
							Build an AI-driven fraud detection system for financial
							institutions, utilizing real-time transaction data from IoT
							devices to identify and prevent fraudulent activities
						</p>
					</div> */}
				</div>
			</div>
		</div>
	);
};
