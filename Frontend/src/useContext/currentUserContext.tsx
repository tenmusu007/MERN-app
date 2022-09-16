import { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
interface children {
	children: ReactNode;
}
interface userData {
	current: object;
	setCurrent: (user: any) => void;
	result: any;
}
interface loginApi {
	username: string;
	password: string;
}
export const userContext = createContext<userData | null>(null);
const CurrentUser = ({ children }: children) => {
	const [current, setCurrent] = useState<object>({});
	const [result, setResult] = useState<any>();

	console.log("current user", current);

	return (
		<userContext.Provider value={{ current, setCurrent,result }}>
			{children}
		</userContext.Provider>
	);
};

export default CurrentUser;
