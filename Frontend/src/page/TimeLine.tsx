import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import Header from '../components/Header'
import Post from '../components/Post'
import Tweet from '../components/Tweet';

const TimeLine = () => {
  const [postAll, setPostAll] = useState<[]>([]);
  const [count, setCount] = useState(0)
  console.log("All", postAll);
  
  useEffect(() => {
    const fetchPostAll = (async () => {
      const postAll = await axios.get(
        `http://localhost:9000/post/timeline/get/all`
      )
      setPostAll(postAll.data);
    });
    fetchPostAll()
  }, []);
  return (
    <>
      <Header />
      <Tweet/>
      {postAll.map((post: any, index: number) => {
        return <Post post={post} key={index} setPostAll={setPostAll} postAll={postAll} />
      })}
    </>
  )
}

export default TimeLine