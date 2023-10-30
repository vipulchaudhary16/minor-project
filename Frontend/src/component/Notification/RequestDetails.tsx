// import React from 'react';

// interface RequestDetailsProps {
// 	fromName: string;
// 	toName: string;
// 	formattedDate: string;
// 	statement: string;
// 	status: 'accepted' | 'rejected' | 'pending';
// 	message?: string;
// }

// const colors = {
// 	accepted: 'text-green-500',
// 	rejected: 'text-red-500',
// 	pending: 'text-yellow-500',
// };

// export const RequestDetails: React.FC<RequestDetailsProps> = ({
// 	formattedDate,
// 	statement,
// 	status,
// 	fromName,
// 	toName,
// 	message
// }) => (
// 	<>
// 		<p className='text-xl italic text-right mb-2'>{formattedDate}</p>
// 		<p className='text-2xl'>
// 			{fromName} requested {toName} for {statement}
// 		</p>
// 		{
// 			message && (
// 				<p className='text-2xl py-2'>
// 					<span className='text-2xl font-bold'>message:</span> {message}
// 				</p>
// 			)
// 		}
// 		<p className='text-2xl py-2'>
// 			<span className='font-bold text-2xl'>Status: </span>
// 			<span className={'text-2xl ' + colors[status]}>{status}</span>
// 		</p>
// 	</>
// );
