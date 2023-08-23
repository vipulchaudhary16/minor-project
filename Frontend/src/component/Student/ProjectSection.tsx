import { useEffect, useState } from 'react';
import ProjectTable from '../ProjectTable';
import axios from 'axios';
import PopUp from '../PopUp';
import AddProblemStatementForm from '../Faculty/AddProblemStatement';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/user.selector';
import { toast } from 'react-toastify';
import { Loader } from '../Utils/Loader';

export const ProjectSectionStudent = () => {
	const [projectList, setProjectList] = useState([]);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const user = useSelector(userSelector);
	const columns = ['Project Title', 'Domain', 'Faculty Name', 'Action'];
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchProjectList();
	}, []);

	const fetchProjectList = async () => {
		setLoading(true);
		try {
			let url = 'http://localhost:8080';
			if (user?.role === 1) {
				//faculty
				url += '/api/problemStatement/?facultyId=' + user.id;
			} else {
				//student
				url += '/api/problemStatement/';
			}
			const res = await axios.get(url);
			setProjectList(res.data);
		} catch (error) {
			toast.error('Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	const handleOnSuccess = () => {
		setIsFormOpen(false);
		fetchProjectList();
	};

	return (
		<>
			{user && user.role === 1 ? (
				<PopUp
					setIsOpen={setIsFormOpen}
					isOpen={isFormOpen}
					heading='Add Project'
				>
					<AddProblemStatementForm onSuccess={handleOnSuccess} />
				</PopUp>
			) : null}
			<div className='max-h-screen p-[6rem] overflow-auto'>
				<div className='bg-[#ebf3fe] mb-[3rem] p-[2.5rem] rounded-lg'>
					<h2 className='text-[2.2rem] text-[#5d87ff] font-semibold'>
						Project List
					</h2>
				</div>
				<div className='flex justify-between items-center mb-[2rem]'>
					{user && user.role === 1 ? (
						<button
							className='bg-[#5d87ff] text-white px-[1.5rem] py-[0.5rem] rounded-lg'
							onClick={() => setIsFormOpen(true)}
						>
							Add Project
						</button>
					) : null}
				</div>
				<div className='card p-[2.5rem] rounded-lg'>
					{loading ? (
						<Loader heading='Loading projects' />
					) : (
						<ProjectTable projects={projectList} columns={columns} />
					)}
				</div>
			</div>
		</>
	);
};
