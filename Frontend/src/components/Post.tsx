import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
const PostStyled = styled.section`
	width: 70%;
	/* height: 200px;/ */
	margin: 60px auto;
	.cardHeader {
		width: 40%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.time {
			font-size: 10px;
			display: flex;
			white-space: nowrap;
			padding: 0 10px;
		}
		.deleteBtn {
			font-size: 10px;
			display: flex;
			align-items: center;
			padding: 0 5px;
			height: 20px;
		}
	}
	.text {
		/* width: 80%; */
		margin: 10px auto;
		font-size: 14px;
	}
	.likeCommentConatienr {
		display: flex;
		flex-direction: row-reverse;
		.like {
			margin-left: 10px;
		}
	}
`;
const Post = ({ post, setPostAll, postAll }: any) => {
	// console.log(postAll);	

	// const [posts, setPosts] = useState([]);
	const [like, setLike] = useState(post.likes.length);
	const handleDel = (e: React.MouseEvent<HTMLButtonElement>) => {
		const deletePost = async () => {
			console.log(post._id);
			const delte = await axios
				.delete(`http://localhost:9000/post/${post._id}`)
				.then((res) => console.log(res));
			// window.location.reload();
			const filteredPost = postAll.filter(
				(value: any) => value._id !== post._id
			);
			console.log("filter", filteredPost);

			setPostAll(filteredPost);
		};
		deletePost();
	};

	return (
		<PostStyled>
			<div className='cardHeader'>
				<div>ICON</div>
				<div>Atsu</div>
				<p className='time'>10 min ago</p>
				<button className='deleteBtn' onClick={handleDel}>
					del
				</button>
			</div>
			<p className='text'>{post ? post.desc : null}</p>
			<div className='likeCommentConatienr'>
				<div className='like'>Like {like}</div>
				<div>comment</div>
			</div>
		</PostStyled>
	);
};

export default Post;
