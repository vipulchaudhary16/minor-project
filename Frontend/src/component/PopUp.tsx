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
						<div className='flex justify-between items-center w-full mb-4'>
							<h3 className='text-[1.4rem] font-bold'>{heading}</h3>
							<button className='text-[1.4rem] text-red-500' onClick={closePopUp}>
								Close
							</button>
						</div>
						<div className=''>{children}</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PopUp;
