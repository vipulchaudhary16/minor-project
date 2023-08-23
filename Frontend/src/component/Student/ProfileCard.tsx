import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/user.selector';
import { useState } from 'react';
import PopUp from '../PopUp';
import GroupForm from './GroupForm';
import { GroupTable } from './GroupTable';

export const ProfileCardStudent = () => {
	const user = useSelector(userSelector);
	const [isPopUpOpen, setIsPopUpOpen] = useState(false);
	console.log(user)

	return (
		<>
			<div className='flex gap-[3rem] justify-center items-center'>
				<div className='w-[20rem] h-[20rem] border rounded-full overflow-hidden'>
					<img
						className='relative top-[1rem]'
						src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png'
					></img>
				</div>
				<div className='flex flex-col gap-[1rem]'>
					<div className='flex gap-[.5rem]'>
						<p className='text-[1.5rem] font-semibold'>Name:</p>
						<p className='text-[1.5rem]'>{user.name}</p>
					</div>
					<div className='flex gap-[.5rem]'>
						<p className='text-[1.5rem] font-semibold'>Roll No.:</p>
						<p className='text-[1.5rem]'>{}</p>
					</div>
					<div className='flex gap-[.5rem]'>
						<p className='text-[1.5rem] font-semibold'>Mail:</p>
						<p className='text-[1.5rem]'>{user?.email}</p>
					</div>
				</div>
			</div>
			{user?.group.length > 0 ? (
				<div className='my-[2rem]'>
					<button
						className='bg-[#5d87ff] text-white text-[1.3rem] font-semibold py-[1rem] px-[1.8rem] rounded-md hover:bg-[#557deb]'
						onClick={() => setIsPopUpOpen(true)}
					>
						Create Team
					</button>
					{isPopUpOpen && (
						<PopUp heading='' isOpen={isPopUpOpen} setIsOpen={setIsPopUpOpen}>
							<GroupForm />
						</PopUp>
					)}
				</div>
			) : (
				<div className='my-[2rem]'>
					<GroupTable groupInformation={user.group[0]} />
				</div>
			)}
		</>
	);
};
