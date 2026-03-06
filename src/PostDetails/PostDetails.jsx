import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Comment from "../Comment/Comment";
import CreatComment from "../CreatComment/CreatComment";
import { Helmet } from "react-helmet";

export default function PostDetails() {
  let { id } = useParams();
  function getsinglepost(id) {
    return axios.get(`api/posts/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getsinglepost", id], // 👈 include id in key
    queryFn: () => getsinglepost(id),
    select: (data) => data.data.post,
  });
  console.log(data);
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
        <title>Post Details</title>
      </Helmet>
      <div className="container w-[60%] mx-auto text-center mt-7">
        <div key={data._id} className="card">
          <h1>{data.user.name}</h1>
          <div className="image my-4 flex justify-center items-center">
            <img src={data.user.photo} alt="image"></img>
          </div>
          <CreatComment postId={data._id} />
          <p>Body:{data.body}</p>
          {data?.comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      </div>
    </>
  );
}
