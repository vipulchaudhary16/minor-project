import { useEffect, useState } from 'react';
import ProjectTable from '../ProjectTable';
import axios from 'axios';
import PopUp from '../PopUp';
import AddProblemStatementForm from '../Faculty/AddProblemStatement';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/user.selector';
import { toast } from 'react-toastify';
import { Loader } from '../Utils/Loader';
import PageHeading from '../PageHeading';

export const ProjectSectionStudent = () => {
	const [projectList, setProjectList] = useState([]);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const user = useSelector(userSelector);
	const columns = ['Problem Statements', 'Domain', 'Faculty Name', 'Action'];
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
				<PageHeading title='Project Lists' />
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
				<div className='card p-[2.5rem] rounded-3xl'>
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
