import React from 'react';
import ProjectRow from './ProjectRow';

interface Project {
	_id: string;
	statement: string;
	domain: string;
	faculty: {
		_id: string;
		name: string;
	};
}

interface Props {
	projects: Project[];
}

const ProjectTable: React.FC<Props> = ({ projects }) => {
  return (
		<div className='w-full'>
			<table className='min-w-full divide-y divide-gray-200'>
				<thead>
					<tr>
						<th className='px-[2.4rem] py-[1.2rem] text-left text-[1.5rem] text-[#5A6A85] font-semibold uppercase tracking-wider'>
							Project Title
						</th>
						<th className='px-[2.4rem] py-[1.2rem] text-left text-[1.5rem] text-[#5A6A85] font-semibold uppercase tracking-wider'>
							Domain
						</th>
						<th className='px-[2.4rem] py-[1.2rem] text-left text-[1.5rem] text-[#5A6A85] font-semibold uppercase tracking-wider'>
							Faculty Name
						</th>
						<th className='px-[2.4rem] py-[1.2rem] text-left text-[1.5rem] text-[#5A6A85] font-semibold uppercase tracking-wider'>
							Action
						</th>
					</tr>
				</thead>
				<tbody className='text-[#5A6A85]'>
					{projects.map((project) => (
						<ProjectRow key={project._id} project={project} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProjectTable;
