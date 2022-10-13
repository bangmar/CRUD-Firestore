import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../lib/firebase";

function UserAdd(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const userNameChange = (e) => {
		setUsername(e.target.value);
	};
	const passwordChange = (e) => {
		setPassword(e.target.value);
	};

	const submitForm = (e) => {
		e.preventDefault();
		test();
		if (username === "" || password === "") {
			alert("username dan password tidak boleh kosong");
			return;
		}

		const userRef = collection(firestore, "users");
		addDoc(userRef, {
			username: username,
			password: password,
		})
			.then((response) => {
				console.log(response);
			})
			.catch((e) => {
				console.log(e);
			});

		props.addHandler();

		setUsername("");
		setPassword("");
	};

	return (
		<div className='bg-slate-900 w-fit px-40 py-2 h-screen fixed top-0 left-0'>
			<div className='container m-auto'>
				<p className='font-sm mt-8 font-bold text-slate-200 mb-4'>New User</p>
				<form className='flex flex-col gap-3' onSubmit={submitForm}>
					<div className='flex flex-col gap-1'>
						<label htmlFor='username' className='text-slate-200 mb-2'>
							username
						</label>
						<input
							type='text'
							value={username}
							onChange={userNameChange}
							className='ring-slate-500 ring-2 w-52 h-6 rounded-sm shadow-md px-2 py-4'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label htmlFor='password' className='text-slate-200 mb-2'>
							password
						</label>
						<input
							type='password'
							value={password}
							onChange={passwordChange}
							className='ring-slate-500 ring-2 w-52 h-6 rounded-sm shadow-md px-2 py-4'
						/>
					</div>
					<div className='btn-wrapper w-fit mt-4 flex gap-4'>
						<button
							className='text-slate-800 font-bold bg-blue-300 px-6 py-2 rounded-lg shadow-md cursor-pointer'
							type='submit'
							o>
							save
						</button>
						<button
							className='text-slate-800 font-bold bg-slate-300 px-6 py-2 rounded-lg shadow-md cursor-pointer'
							type='submit'
							onClick={props.addHandler}
							o>
							cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default UserAdd;
