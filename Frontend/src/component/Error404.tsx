import React from 'react';

const Error404: React.FC = () => {
	return (
		<div className='flex items-center justify-center h-screen bg-gray-100'>
			<div className='text-center'>
				<h1 className='text-4xl font-bold mb-4'>Error 404</h1>
				<p className='text-xl mb-4'>Page not found!</p>
				<p className='text-gray-600'>
					Oops! The page you are looking for does not exist.
				</p>
			</div>
		</div>
	);
};

export default Error404;
