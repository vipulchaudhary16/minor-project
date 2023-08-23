import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/user.selector';

export const ProfileFaculty = () => {
	const user = useSelector(userSelector);

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
						<p className='text-[1.5rem] font-semibold'>Mail:</p>
						<p className='text-[1.5rem]'>{user?.email}</p>
					</div>
				</div>
			</div>
		</>
	);
};
