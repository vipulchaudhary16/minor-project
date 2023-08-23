import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/user.selector';
import { useState } from 'react';
import PopUp from '../PopUp';
import GroupForm from './GroupForm';
import { GroupTable } from './GroupTable';

export const ProfileCardStudent = () => {
	const user = useSelector(userSelector);
	const [isPopUpOpen, setIsPopUpOpen] = useState(false);
	console.log(user);

	return (
		<>
			<div className='grid grid-cols-2 gap-[3rem]'>
				<div className='flex gap-[3rem] justify-center items-center card p-[3.5rem] rounded-lg'>
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
				<div className='card p-[2.5rem]'>
					<div className='flex justify-between items-center'>
						<h3 className='text-[#2A3547] text-[1.9rem] font-semibold'>
							Group Details
						</h3>
						<div>
							<button
								className='bg-[#5d87ff] text-white text-[1.1rem] font-semibold py-[.8rem] px-[1.4rem] rounded-md hover:bg-[#557deb]'
								onClick={() => setIsPopUpOpen(true)}
							>
								Create Group
							</button>
							{isPopUpOpen && (
								<PopUp
									heading=''
									isOpen={isPopUpOpen}
									setIsOpen={setIsPopUpOpen}
								>
									<GroupForm />
								</PopUp>
							)}
						</div>
					</div>
					<div className='h-[85%] mt-[1rem]'>
						{user?.group.length > 1 ? (
							<div className='h-full  flex justify-center items-center text-[1.3rem] font-medium'>
								Not in any group
							</div>
						) : (
							<>
								<GroupTable groupInformation={user.group[0]} />
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
