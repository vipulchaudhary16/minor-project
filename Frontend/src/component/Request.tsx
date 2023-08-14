import React from 'react';
import { TRequest } from '../types/request.types';
import { RequestDetails } from './RequestDetails';

interface RequestProps {
	request: TRequest;
	requestType: string;
}

export const Request: React.FC<RequestProps> = ({ request, requestType }) => {
	const isoDateString = request.createdAt;
	const date = new Date(isoDateString);

	const options: any = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};

	const formatter = new Intl.DateTimeFormat('en-IN', options);
	const formattedDate = formatter.format(date);

	return (
		<div className='border rounded-lg p-4 bg-gray-100 my-4'>
			{request.type === 'GROUP_INVITE' && (
				<div className='flex flex-col my-2'>
					{requestType === 'sent' && (
						<>
							<RequestDetails
								userName={request.user.name}
								formattedDate={formattedDate}
								statement='joining your group'
								status={request.status}
							/>
						</>
					)}
					{requestType === 'received' && (
						<>
							<RequestDetails
								userName={request.user.name}
								formattedDate={formattedDate}
								statement='joining his group'
								status={request.status}
							/>
							<div>
								<button className='px-8 py-4 bg-cyan-400 mx-2 my-4 text-2xl rounded-lg text-white font-bold'>
									Accept
								</button>
								<button className='px-8 py-4 bg-red-400 mx-2 my-4 text-2xl rounded-lg text-white font-bold'>
									Reject
								</button>
							</div>
						</>
					)}
				</div>
			)}
			{request.type === 'PROJECT_REQUEST' && (
				<div className='flex flex-col my-2'>
					{requestType === 'sent' && (
						<>
							<RequestDetails
								userName={request.user.name}
								formattedDate={formattedDate}
								statement={`selecting problem statement ${request?.problemStatementDetails?.statement}`}
								status={request.status}
							/>
						</>
					)}
					{requestType === 'received' && (
						<>
							<RequestDetails
								userName={request.user.name}
								formattedDate={formattedDate}
								statement={`working on problem statement ${request?.problemStatementDetails?.statement}`}
								status={request.status}
							/>
							<div>
								<button className='px-8 py-4 bg-cyan-400 mx-2 my-4 text-2xl rounded-lg text-white font-bold'>
									Accept
								</button>
								<button className='px-8 py-4 bg-red-400 mx-2 my-4 text-2xl rounded-lg text-white font-bold'>
									Reject
								</button>
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);
};
