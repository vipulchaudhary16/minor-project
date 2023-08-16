import React from 'react';

interface RequestDetailsProps {
	fromName: string;
  toName: string;
	formattedDate: string;
	statement: string;
	status: string;
}

export const RequestDetails: React.FC<RequestDetailsProps> = ({
	formattedDate,
	statement,
	status,
  fromName,
  toName
}) => (
	<>
		<p className='text-2xl'>
			{fromName} requested {toName} for {statement} at{' '}
			<span className='font-semibold'>{formattedDate}</span>
		</p>
		<p className='text-2xl'>
			<span className='font-bold text-2xl'>Status:</span> {status}
		</p>
	</>
);
