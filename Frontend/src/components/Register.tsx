import axios from "axios";
import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const RegisterStyled = styled.section`
	.RegisterContainer {
		margin-top: 100px;
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
	button {
		width: 60px;
		margin: 0 auto;
		padding: 10px 0;
		border-radius: 10px;
		border: none;
	}
`;
const Register = () => {
	const emailRef = useRef<HTMLInputElement>(null!);
	const passwordRef = useRef<HTMLInputElement>(null!);
	const usernameRef = useRef<HTMLInputElement>(null!);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;
		const username = usernameRef.current?.value;
		console.log("email", email, "password", password, "usernaeme", username);
		axios
			.post(`/auth/register`, {
				username: username,
				email: email,
				password: password,
			})
			.then((res) => console.log(res));
	};
	return (
		<RegisterStyled>
			<div className='RegisterContainer'>
				<form onSubmit={handleSubmit}>
					<input type='text' placeholder='eamil' ref={emailRef} />
					<input type='text' placeholder='password' ref={passwordRef} />
					<input type='text' placeholder='user name' ref={usernameRef} />
					<button> sign up</button>
				</form>
				<NavLink to={"/"}>
					<button>Login</button>
				</NavLink>
			</div>
		</RegisterStyled>
	);
};

export default Register;
