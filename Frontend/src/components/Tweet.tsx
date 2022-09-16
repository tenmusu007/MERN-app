import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
const TweetStyled = styled.section`
	.tweetContainer {
		width: 60%;
		margin: 65px auto;
		text-align: center;
		input {
			border: none;
			:focus {
				outline: none;
			}
		}
		button {
			padding: 5px 15px;
			font-size: 12px;
		}
	}
`;
const Tweet: React.FC = () => {
	const postRef = useRef<HTMLTextAreaElement>(null!);
	const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const postTxt: string = await postRef.current?.value;
		console.log(postTxt);
		const newPost = {
			userId: "631bcef06017b90c9f8253da",
			desc: postTxt,
		};
		await axios.post(`http://localhost:9000/post`, newPost);
		window.location.reload();
		// await axios
		// 	.get(`http://localhost:9000/post/timeline/all`)
		// 	.then((res) => console.log(res));
	};
	return (
		<TweetStyled>
			<form onSubmit={handlePost} className='tweetContainer'>
				<textarea ref={postRef} placeholder='You can tell us anything' />
				{/* <input
					type='text'
					ref={postRef}
					placeholder='You can tell us anything'
				/> */}
				<button>Post</button>
			</form>
		</TweetStyled>
	);
};

export default Tweet;
