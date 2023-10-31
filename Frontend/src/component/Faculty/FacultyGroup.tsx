import axios from 'axios';
import React, { useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { Loader } from '../Utils/Loader';
import PopUp from '../Utils/PopUp';
import { GroupDetailsCard } from '../Cards/GroupDetailsCard';

const columns = ['Sr.', 'Group Name', , 'Project', 'Action'];

export const FacultyGroup: React.FC = () => {
	const [groups, setGroups] = React.useState<any[]>([]);
	const [selectedGroup, setSelectedGroup] = React.useState<any>({});
	const [loading, setLoading] = React.useState<boolean>(false);
	const [isPopUpOpen, setIsPopUpOpen] = React.useState<boolean>(false);

	useEffect(() => {
		getGroups();
	}, []);

	const getGroups = async () => {
		setLoading(true);
		const url = 'http://localhost:8080/api/group/my-groups';
		try {
			const res = await axios.get(url);
			setGroups(res.data);
		} catch (error) {
			toast.error('Error while fetching groups');
		}
		setLoading(false);
	};

	const openGroupDetails = (group: any) => {
		setSelectedGroup(group);
		setIsPopUpOpen(true);
	};

	return (
		<div className='my-4'>
			<PopUp
				isOpen={isPopUpOpen}
				setIsOpen={setIsPopUpOpen}
				heading='Group Details'
			>
				<GroupDetailsCard group={selectedGroup} />
			</PopUp>
			<div className='bg-secondary-color p-[1.5rem] rounded-lg'>
				<h2 className='text-[1.5rem] text-primary-color font-semibold'>
					Your Groups
				</h2>
			</div>
			{loading ? (
				<Loader heading='Loading groups' />
			) : (
				<table className='min-w-full divide-y divide-gray-200'>
					<thead>
						<tr>
							{columns.map((column) => (
								<th
									key={column}
									className='p-[1.4rem] text-left text-[1.4rem] text-[#5A6A85] font-semibold uppercase tracking-wider'
								>
									{column}
								</th>
							))}
						</tr>
					</thead>
					<tbody className='text-[#5A6A85]'>
						{groups.map((group, index) => (
							<>
								<tr>
									<td className='p-[1.4rem] whitespace-no-wrap'>
										<div className='text-[1.3rem] font-medium'>{index + 1}</div>
									</td>

									<td
										className='p-[1.4rem] whitespace-no-wrap'
										onClick={() => openGroupDetails(group)}
									>
										<div className='text-[1.3rem] text-cyan-600 cursor-pointer font-medium'>
											Group {group.groupNumber}
										</div>
									</td>
									<td className='p-[1.4rem] whitespace-no-wrap'>
										<div className='text-[1.3rem] font-medium'>
											{group.selectedProblemStatement.statement}
										</div>
									</td>
									<td className='p-[1.4rem] text-[1.3rem] whitespace-no-wrap'>
										<span className='px-2'>
											<AiOutlineDelete className='inline text-red-600 text-[1.3rem] cursor-pointer' />
										</span>
									</td>
								</tr>
							</>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};
