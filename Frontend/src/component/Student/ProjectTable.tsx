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
	columns: string[];
}

const ProjectTable: React.FC<Props> = ({ projects, columns }) => {
	return (
		<div className='w-full'>
			<table className='min-w-full divide-y divide-gray-200'>
				<thead>
					<tr>
						{columns.map((column, index) => (
							<th
								key={index}
								className='p-[1.4rem] text-left text-[1.4rem] text-[#5A6A85] font-semibold uppercase tracking-wider'
							>
								{column}
							</th>
						))}
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
