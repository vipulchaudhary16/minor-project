import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user.context';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate()

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await axios.post('http://localhost:8080/api/user/login', {
			email,
			password,
		});
		console.log(res.data.user);
		setUser(res.data.user);
		const role = res.data.user.role;
		switch (role) {
			case 1:
				navigate('/faculty');
				break;
			case 2:
				navigate('/student');
				break;
			case 0:
				navigate('/admin');
				break;
			default:
				navigate('/');
				break;
		}
		localStorage.setItem('user', JSON.stringify(res.data.user));
	};

	const handleForgotPassword = (e: React.MouseEvent) => {
		e.preventDefault();
		// Add your "Forgot Password" logic here
		console.log('Forgot Password clicked');
	};

	return (
		<div className='h-screen flex items-center justify-center bg-gray-100'>
			<div className='w-1/3 p-[2.5rem] bg-white rounded-lg shadow-md'>
				<h2 className='text-[#5d87ff] text-[2.5rem] font-semibold text-center mb-[1.6rem]'>
					Login
				</h2>
				<form onSubmit={handleLogin} className='text-[#5d87ff]'>
					<div className='mb-[1.6rem]'>
						<label
							htmlFor='email'
							className='block text-[1.2rem] font-semibold mb-[.8rem]'
						>
							Email
						</label>
						<input
							type='email'
							id='email'
							className='w-full px-[1.2rem] py-[.8rem] border rounded-md focus:outline-none focus:ring-1 focus:ring-[#557deb] text-[1.2rem]'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className='mb-[2rem]'>
						<label
							htmlFor='password'
							className='block text-[1.2rem] font-semibold mb-[.8rem]'
						>
							Password
						</label>
						<input
							type='password'
							id='password'
							className='w-full px-[1.2rem] py-[.8rem] border rounded-md focus:outline-none focus:ring-1 focus:ring-[#557deb] text-[1.2rem]'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className='text-center'>
						<button
							type='submit'
							className='w-full bg-[#5d87ff] text-white text-[1.3rem] font-semibold py-[1rem] px-[1.6rem] rounded-md hover:bg-[#557deb]'
						>
							Login
						</button>
					</div>
				</form>
				<div className='text-center mt-[1.6rem]'>
					<a
						href='#'
						className='text-[1.2rem] text-[#5d87ff] hover:text-[#557deb] font-medium underline'
						onClick={handleForgotPassword}
					>
						Forgot Password?
					</a>
				</div>
			</div>
		</div>
	);
};

export default Login;
