import React from 'react';
// import { ThreeDots } from 'react-loader-spinner';
import { HashLoader } from 'react-spinners';


interface IProps {
	heading: string;
}

export const Loader: React.FC<IProps> = ({ heading }) => {
	return (
		<div className='flex flex-col items-center justify-center h-full py-4'>
			{/* <ThreeDots
				height={80}
				width={80}
				radius={9}
				color='#4fa94d'
				ariaLabel='three-dots-loading'
			/>
			<span className='mt-2 font-bold text-2xl'>{heading}...</span> */}
			<HashLoader color='#5d87ff' />
		</div>
	);
};
