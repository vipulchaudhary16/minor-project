import { useSelector } from 'react-redux';
import { userSelector } from '../store/user/user.selector';
import { ProfileFaculty } from './Faculty/ProfileCard';
import { ProfileCardStudent } from './Student/ProfileCard';

const Profile = () => {
	const user = useSelector(userSelector);

	return (
		<>
			<div className=''>
				<div className='max-h-screen p-[6rem] overflow-auto'>
					<div className='bg-[#ebf3fe] mb-[3rem] p-[2.5rem] rounded-lg'>
						<h2 className='text-[2.2rem] text-[#5d87ff] font-semibold'>
							Profile
						</h2>
					</div>
					<div className='card p-[3.5rem] rounded-lg'>
						{user.role === 1 ? <ProfileFaculty /> : <></>}
						{user.role === 2 ? <ProfileCardStudent /> : <></>}
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
