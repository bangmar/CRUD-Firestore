import React, { useEffect } from "react";
import ListUpdate from "../components/ListUpdate";

function Home() {
	return (
		<div className='container m-auto my-10 mx-28'>
			<h1 className='text-4xl mb-5 font-bold'>Firebase Storage</h1>
			{/* <UserList /> */}
			<ListUpdate />
		</div>
	);
}

export default Home;
