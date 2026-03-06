import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Comment from "../Comment/Comment";
import DeletePost from "../DeletePost/DeletePost";
import UpdatePost from "../UpdatePost/UpdatePost";
import GetUserComments from "../GetUserComments/GetUserComments";
import CreatComment from "./../CreatComment/CreatComment";

export default function GetUserPosts({ id }) {
  function getUserPosts(id) {
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["getUserPosts", id], // include id in the key
    queryFn: () => getUserPosts(id),
    select: (data) => data.data.posts,
  });
  console.log(data);
  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="container w-[60%] mx-auto text-center mt-7">
        {data?.map((post) => (
          <React.Fragment key={post._id}>
            <div className="card">
              <h1>{post.user.name}</h1>
              <div className="image my-4 flex justify-center items-center">
                <img src={post.image} alt="post" />
              </div>

              {/* <GetUserComments postId={post._id} /> */}
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <DeletePost id={post._id} />
                <UpdatePost id={post._id} />
              </div>
            </div>
            <div className="middle flex justify-center mb-7 pb-7 mt-5">
              <CreatComment postId={post._id} />
            </div>
            {post.comments?.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
