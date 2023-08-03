import React, { FormEvent } from 'react';
import PopUp from './PopUp';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Project {
	_id: string;
	statement: string;
	domain: string;
	faculty: {
		name: string;
		_id: string;
	};
}

interface ProjectRowProps {
	project: Project;
}

const ProjectRow: React.FC<ProjectRowProps> = ({ project }) => {
	const [isPopUpOpen, setIsPopUpOpen] = React.useState<boolean>(false);
	const [message, setMessage] = React.useState<string>('');

	const openPopUp = () => {
		setIsPopUpOpen(true);
	};

	const sendRequest = async (e: FormEvent) => {
		e.preventDefault();
		const body = {
			message,
			to: project.faculty._id,
			data: {
				problemId: project._id,
			},
		};
		try {
			await axios.post('http://localhost:8080/api/request/send', body);
			return toast('Request sent successfully');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{isPopUpOpen && (
				<PopUp
					heading='send message'
					isOpen={isPopUpOpen}
					setIsOpen={setIsPopUpOpen}
				>
					<form className='flex flex-col' onSubmit={(e) => sendRequest(e)}>
						<textarea
							placeholder='Enter your message to be sent to the faculty'
							className='border rounded p-2 mb-4 text-[1.3rem]'
							value={message}
							required
							onChange={(e) => setMessage(e.target.value)}
							cols={30}
							rows={10}
						/>
						<button className='bg-[#5d87ff] text-white rounded p-2'>
							Send
						</button>
					</form>
				</PopUp>
			)}
			<tr key={project._id}>
				<td className='px-[2.4rem] py-[1.6rem] whitespace-no-wrap'>
					<div className='text-[1.3rem] font-medium'>{project.statement}</div>
				</td>
				<td className='px-[2.4rem] py-[1.6rem] whitespace-no-wrap'>
					<div className='text-[1.3rem] font-medium'>{project.domain}</div>
				</td>
				<td className='px-[2.4rem] py-[1.6rem] whitespace-no-wrap'>
					<div className='text-[1.3rem] font-medium'>
						{project.faculty.name}
					</div>
				</td>
				<td className='px-[2.4rem] py-[1.6rem] whitespace-no-wrap'>
					<button
						onClick={openPopUp}
						className='text-[1.3rem] font-medium hover:text-[#5d87ff]'
					>
						Send Request
					</button>
				</td>
			</tr>
		</>
	);
};

export default ProjectRow;
