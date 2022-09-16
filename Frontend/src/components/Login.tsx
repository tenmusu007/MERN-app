import React, { useRef, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { userContext } from "../useContext/currentUserContext";
const LgoinStyled = styled.section`
	a {
		text-decoration: none;
		color: black;
	}
	.RegisterContainer {
		margin-top: 100px;
		button {
			width: 60px;
			margin: 0 auto;
			padding: 10px 0;
			border-radius: 10px;
			border: none;
		}
	}
	form {
		display: flex;
		flex-direction: column;
		width: 50%;
		margin: 0 auto;
		input {
			margin: 10px 0 10px 0;
			height: 30px;
			border-radius: 10px;
			border: lightgray 1px solid;
			padding: 5px;
			padding-left: 15px;
			:placeholder-shown {
				padding-left: 15px;
			}
			:focus {
				padding-left: 15px;
			}
		}
		button {
			width: 60px;
			margin: 0 auto;
			padding: 10px 0;
			border-radius: 10px;
			border: none;
		}
	}
`;
const Login = () => {
	const currentUser = useContext(userContext);
	// const { current } = useContext(userContext);
	const navigate = useNavigate();
	const [cookie, setCookie] = useState<string>("no cookie");
	useEffect(() => {
		const getCookie = async () => {
			await axios.get(`/auth/register`).then((res) => {
				loginWithCookie(res.data);
			});
		};
		const loginWithCookie = async (res: string) => {
			if (res !== "no cookie") {
				setCookie(res);
				await axios
					.post(`/auth/cookie/login`, { username: res })
					// .then((res) => console.log(res))
					.then((res) => navigate("/timeline"));
			}
		};
		getCookie();
	}, []);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const password = passwordRef.current?.value;
		const username = usernameRef.current?.value;
		console.log("password", password, "usernaeme", username);
		const Login = async () => {
			const user = await axios
				.post(`/auth/login`, {
					username: username,
					password: password,
				})
				.then((res) => {
					if (res.status === 200) {
						currentUser?.setCurrent(res.data);
						navigate("/timeline");
					}
				})
				.catch((err) => {
					navigate("/register");
				});
		};

		Login();
	};
	const passwordRef = useRef<HTMLInputElement>(null!);
	const usernameRef = useRef<HTMLInputElement>(null!);
	return (
		<LgoinStyled>
			<div className='RegisterContainer'>
				<form onSubmit={handleSubmit}>
					{/* <input type='text' placeholder='eamil' ref={emailRef} /> */}
					<input type='text' placeholder='user name' ref={usernameRef} />
					<input type='text' placeholder='password' ref={passwordRef} />
					<button> Login</button>
				</form>
				<NavLink to={"/register"}>
					<button>Regsiter</button>
				</NavLink>
			</div>
		</LgoinStyled>
	);
};

export default Login;
