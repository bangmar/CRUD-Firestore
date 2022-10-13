import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase";

import UserUpdate from "./UserUpdate";
import { BsTrash, BsPencil } from "react-icons/bs";
import { HiUserAdd } from "react-icons/hi";
import UserAdd from "./UserAdd";

function ListUpdate() {
	const [userData, setUserData] = useState([]);

	// data container
	const [id, setId] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// toogle
	const [isEdit, setEdit] = useState(false);
	const [isAdd, setAdd] = useState(false);

	const deteleUser = (id) => {
		const docRef = doc(firestore, "users", id);
		deleteDoc(docRef)
			.then(() => alert("success removing"))
			.catch((e) => console.log(e));
	};

	const editHandler = (id, username, password) => {
		setId(id);
		setUsername(username);
		setPassword(password);
		setEdit(!isEdit);
	};

	const addHandler = () => {
		setAdd(!isAdd);
	};

	useEffect(() => {
		const userRef = collection(firestore, "users");
		const dataLoad = onSnapshot(userRef, (snapshot) => {
			setUserData(
				snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
			);
		});
		return () => {
			dataLoad();
		};
	}, []);

	return (
		<div>
			<div className='flex gap-4'>
				<div className='listView w-fit'>
					<ul className='flex flex-col gap-5 '>
						{userData.map((item, key) => {
							return (
								<>
									<li
										key={item.id}
										className='bg-slate-900 p-4 shadow-lg w-64 rounded-lg relative group'>
										<p className='text-slate-300'>
											Username: {item.data.username}
										</p>
										<p className='text-slate-300'>
											Password: {item.data.password}
										</p>
										<button
											className='absolute right-0 top-0 h-1/2 bg-slate-100 p-2 invisible group-hover:visible hover:bg-slate-400'
											onClick={() => deteleUser(item.id)}>
											<BsTrash className='text-slate-900 ' />
										</button>
										<button
											className='absolute right-0 bottom-0 h-1/2 bg-slate-100 p-2 rounded-bl-lg invisible group-hover:visible hover:bg-slate-400'
											onClick={() =>
												editHandler(
													item.id,
													item.data.username,
													item.data.password
												)
											}>
											<BsPencil className='text-slate-900 ' />
										</button>
									</li>
								</>
							);
						})}
					</ul>
				</div>
				<div className='refresh-btn p-2 bg-slate-200 h-fit cursor-pointer flex gap-5'>
					<HiUserAdd onClick={() => addHandler()} />
				</div>
			</div>
			{isEdit === true && (
				<UserUpdate
					id={id}
					username={username}
					password={password}
					editHandler={editHandler}
				/>
			)}
			{isAdd === true && <UserAdd addHandler={addHandler} />}
		</div>
	);
}

export default ListUpdate;
