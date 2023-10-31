import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { userSelector } from '../../store/user/user.selector';
import axios from 'axios';

type optionType = {
	id: string;
	rollNo: string;
};

const GroupForm = () => {
	const [members, setMembers] = useState<optionType[]>([]);
	const [unGroupedUsers, setUnGroupedUsers] = useState<optionType[]>([]);
	const [selectedMember, setSelectedMember] = useState<string>('');
	const user = useSelector(userSelector);

	useEffect(() => {
		setMembers([
			{
				id: user.id,
				rollNo: user.rollNo,
			},
		]);
		fetchUnGroupedUsers();
	}, []);

	const fetchUnGroupedUsers = async () => {
		const res = await axios.get(
			'http://localhost:8080/api/group/get-ungrouped-users'
		);
		setUnGroupedUsers(res.data);
	};

	const addMember = (memberId: string) => {
		if (members.length >= 3) {
			toast.error('Max 3 members are allowed');
			return;
		}
		if (members.find((m) => m.id === memberId)) {
			toast.error('Member already added');
			return;
		}
		const member = unGroupedUsers.find((m) => m.id === memberId);
		if (member) setMembers([...members, member]);
	};

	const removeMember = (member: optionType) => {
		if (members.length <= 1) {
			toast.error('At least one member is required');
			return;
		}
		setMembers(members.filter((m) => m.id !== member.id));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const invitedMembers = members.filter((m) => {
			if (m.id !== user.id) {
				return m.id;
			}
		});
		const memberIds = invitedMembers.map((m) => m.id);
		try {
			const res = await axios.post('http://localhost:8080/api/group/create', {
				members: memberIds,
			});
			toast.success(
				'Group created successfully namely: Group ' + res.data.groupNumber
			);
			if (memberIds.length > 0) {
				toast.info('Inform your group members to accept the group invitation');
			}
		} catch (error: any) {
			toast.error(error.response.data);
		}
	};

	return (
		<div className='max-w-[50rem] w-screen p-[1.6rem]'>
			<div>
				<div className='block text-[1.8rem] font-semibold'>Members</div>
				<ul className='mt-[1rem] flex flex-col gap-[1rem]'>
					{members.map((member, index) => (
						<li
							key={index}
							className='flex justify-between items-center gap-[3rem] bg-gray-100 p-[1rem] rounded-lg'
						>
							<div className='flex gap-[.5rem]'>
								<p className='text-[1.25rem] font-semibold'>
									Member {index + 1}:{' '}
								</p>
								<p className='text-[1.25rem]'>{member.rollNo}</p>
							</div>
							{member.rollNo !== user.rollNo && (
								<button
									type='button'
									onClick={() => removeMember(member)}
									className='text-[1.2rem] text-red-500'
								>
									Remove
								</button>
							)}
						</li>
					))}
				</ul>
			</div>
			<div>
				<div className='text-[1.8rem] font-semibold mt-[3rem]'>Add Member</div>
				<form onSubmit={handleSubmit} className='mt-[.8rem]'>
					<div className='flex items-center justify-between'>
						<select
							id='rollNumber'
							value={selectedMember}
							onChange={(e) => setSelectedMember(e.target.value)}
							className='p-2 transition duration-150 ease-in-out border border-gray-300 rounded-lg shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200'
						>
							<option value=''>Select Roll No</option>
							{unGroupedUsers.map((member) => (
								<option key={member.id} value={member.id}>
									{member.rollNo}
								</option>
							))}
						</select>
						<button
							type='button'
							onClick={() => addMember(selectedMember)}
							className='border border-primary-color text-primary-color text-[1.2rem] font-semibold py-[.5rem] px-[1.5rem] rounded-lg hover:bg-[#557deb] hover:text-[#fff]'
						>
							Add
						</button>
					</div>
					<div className='mt-[1.5rem]'>
						<button
							type='submit'
							className='w-full bg-primary-color text-white text-[1.3rem] font-semibold py-[.8rem] rounded-lg hover:bg-[#557deb]'
						>
							Create Group
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default GroupForm;
