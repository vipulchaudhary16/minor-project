// UnauthorizedPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
	return (
		<div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-100 text-center'>
			<div className='flex flex-col gap-4 items-center p-8 rounded'>
				<h1 className='text-4xl font-bold mb-4'>Unauthorized Access</h1>
				<p className='text-gray-600'>
					Oops! It seems like you don't have permission to access this page.
				</p>
				<button className='bg-[#5d87ff] text-white px-[1.5rem] py-[0.5rem] rounded-lg'>
					<Link to='/' className='hover:underline'>
						Go to Home
					</Link>
				</button>
			</div>
		</div>
	);
};

export default UnauthorizedPage;
