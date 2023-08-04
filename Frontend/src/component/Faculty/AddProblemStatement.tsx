import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface FormFields {
	statement: string;
	domain: string;
}

const initialFormState: FormFields = {
	statement: '',
	domain: '',
};

//define the props
interface AddProblemStatementFormProps {
	onSuccess: () => void;
}

const AddProblemStatementForm: React.FC<AddProblemStatementFormProps> = ({
	onSuccess,
}) => {
	const [formValues, setFormValues] = useState<FormFields>(initialFormState);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// Add your form submission logic here
		const body = {
			statement: formValues.statement,
			domain: formValues.domain,
		};
		try {
			await axios.post(
				'http://localhost:8080/api/problemStatement/create',
				body
			);
			toast.success('Project added successfully');
			onSuccess();
		} catch (error: any) {
			return toast.error(error.response.data.message);
		} 
		setFormValues(initialFormState);
	};

	return (
		<form
			className='max-w-md mx-auto p-4 bg-white shadow-md rounded-md'
			onSubmit={handleSubmit}
		>
			<div className='mb-4'>
				<label
					htmlFor='statement'
					className='block font-semibold text-gray-700 mb-2'
				>
					Statement
				</label>
				<input
					type='text'
					id='statement'
					name='statement'
					value={formValues.statement}
					onChange={handleChange}
					className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
				/>
			</div>
			<div className='mb-4'>
				<label
					htmlFor='domain'
					className='block font-semibold text-gray-700 mb-2'
				>
					Domain
				</label>
				<input
					type='text'
					id='domain'
					name='domain'
					value={formValues.domain}
					onChange={handleChange}
					className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
				/>
			</div>
			<button
				type='submit'
				className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
			>
				Submit
			</button>
		</form>
	);
};

export default AddProblemStatementForm;
