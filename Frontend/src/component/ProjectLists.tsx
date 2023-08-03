import { useEffect, useState } from 'react';
import ProjectTable from './ProjectTable';
import axios from 'axios';

const ProjectLists = () => {
	const [projectList, setProjectList] = useState([]);

	useEffect(() => {
		fetchProjectList();
	}, []);

	const fetchProjectList = async () => {
		try {
			const res = await axios.get(
				'http://localhost:8080/api/problemStatement/'
			);
			setProjectList(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className='max-h-screen p-[6rem] overflow-auto'>
				<div className='bg-[#ebf3fe] mb-[3rem] p-[2.5rem] rounded-lg'>
					<h2 className='text-[2.2rem] text-[#5d87ff] font-semibold'>
						Project List
					</h2>
				</div>
				<div className='card p-[2.5rem] rounded-lg'>
					<ProjectTable projects={projectList} />
				</div>
			</div>
		</>
	);
};

export default ProjectLists;
