import React, { ReactNode } from 'react';

interface ModalProps {
	heading: string;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactNode;
}

const PopUp: React.FC<ModalProps> = ({
	heading,
	isOpen,
	setIsOpen,
	children,
}) => {
	const closePopUp = () => {
		setIsOpen(false);
	};

	return (
		<div>
			{isOpen && (
				<div className='text-black fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='flex flex-col justify-center items-center bg-white p-8 rounded shadow'>
						<div className='flex justify-between w-full mb-4'>
							<h3 className='text-xl font-bold mb-4'>{heading}</h3>
							<button className='text-2xl text-red-500' onClick={closePopUp}>
								Close
							</button>
						</div>
						<div className='shadow-lg p-4'>{children}</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PopUp;
