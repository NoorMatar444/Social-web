import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

export default function DeletePost({ id }) {
  const queryClient=useQueryClient();
  const [Spinner, setisLoading] = useState(false);
  function deletePost(id) {
    setisLoading(true);
    return axios
      .delete(`https://linked-posts.routemisr.com/posts/${id}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log(res);
        queryClient.invalidateQueries({queryKey:[`getUserPosts`]})
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }

  return (
    <>
      {Spinner ? (
        <i class="fa-solid fa-spinner fa-spin"></i>
      ) : (
        <button
          onClick={() => deletePost(id)}
          disabled={Spinner}
          className="bg-red-700 w-[48%] p-2 text-white rounded-xl font-bold ms-24 cursor-pointer hover:to-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          Delete post
        </button>
      )}
    </>
  );
}
