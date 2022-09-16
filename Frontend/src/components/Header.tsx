import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const HeaderStyled = styled.header`
	position: fixed;
	display: flex;
	justify-content: space-between;
	top: 0;
	width: 100%;
	height: 30px;
	margin-top: 10px;
	margin-bottom: 50px;
	.title {
		margin: 0 40px;
	}
	.menuContainer {
		display: flex;
		margin: 0 40px;
    align-items: center;
		div {
			margin: 0 10px;
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
const Header = () => {
  const navigate = useNavigate()
	const handleLogout = () => {
    axios.post(`/auth/logout`)
      .then((res) => console.log(res))
      .then(res=>navigate("/"))
	};
	return (
		<HeaderStyled>
			<p className='title'>title</p>
			<div className='menuContainer'>
				<div>Home</div>
				<div>mail</div>
				<div>notify</div>
				<div>profile</div>
				<button onClick={handleLogout}>Logout</button>
			</div>
		</HeaderStyled>
	);
};

export default Header;
