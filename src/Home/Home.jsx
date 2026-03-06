import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Comment from "../Comment/Comment";
import { Link } from "react-router-dom";
import CreatePost from "../CreatePost/CreatePost";
import CreatComment from "../CreatComment/CreatComment";
import { Helmet } from "react-helmet";


export default function Home() {
  
  const token = localStorage.getItem("userToken");

  function getAllPosts() {
    
    return axios.get(`/api/posts?limit=50`, {
      headers: {
        token: token, 
      },
    });
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
    enabled: !!localStorage.getItem("userToken"),
    select: (data) => data?.data?.posts,
  });
  if (!token) {
    return <p className="text-center mt-10">برجاء تسجيل الدخول لرؤية المنشورات.</p>;
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader" />
      </div>
    );

  if (isError) return <p>Error: {error.message}</p>;
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="container w-[60%] mx-auto text-center mt-7">
        <div className="createPost mb-7">
          <CreatePost />
        </div>
        {data?.map((post) => (
          <div className="mb-7" key={post._id}>
            <Link to={`PostDetails/${post._id}`}>
              <div className="card">
                <h1>{post.user.name}</h1>
                <div className="image my-4 flex justify-center items-center">
                  <img src={post.user.photo} alt="user" />
                </div>
              </div>
            </Link>

            <Comment comment={post.comments[0]} />
            <CreatComment postId={post._id} />
          </div>
        ))}
      </div>
    </>
  );
}
