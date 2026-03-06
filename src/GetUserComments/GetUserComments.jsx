import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function GetUserComments() {
  function getUserComments() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }
  let { data, isLoading, isError, error } = useQuery({
    queryKey: [`getUserComments`],
    queryFn: getUserComments,
    // select:(data)=>data?.comments,
  });
  console.log(data);
  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return <></>;
}
