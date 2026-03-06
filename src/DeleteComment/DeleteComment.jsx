import React, { useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export default function DeleteComment({ id }) {
  const [isLoading, setisLoading] = useState(false);
  const queryClient = useQueryClient();
function handleDeleteComment() {
  setisLoading(true);

  axios
    .delete(`https://linked-posts.routemisr.com/comments/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    })
    .then((response) => {
      console.log("✅ Comment deleted successfully:", response.data);
      queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });
      queryClient.invalidateQueries({ queryKey: ["getsinglepost"] });
    })
    .catch((error) => {
      console.error("❌ Delete error:", error);
    })
    .finally(() => {
      setisLoading(false);
    });
}


  return (
    <>
      {isLoading ? (
        <i className="fa-solid fa-spinner fa-spin"></i>
      ) : (
        <button
          onClick={handleDeleteComment}
          className="bg-blue-700 w-[48%] p-2 text-white rounded-xl font-bold ms-24 cursor-pointer hover:to-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          Delete comment
        </button>
      )}
    </>
  );
}
