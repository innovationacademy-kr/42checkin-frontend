import axios from "axios";
import React, { useEffect } from "react";

function Test() {
	useEffect(async () => {
		const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/status`);
		console.log(new Date(response.data.user.timeOut), new Date());
	}, []);
	return <div></div>;
}

export default Test;
