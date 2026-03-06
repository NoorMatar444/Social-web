import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import UploadPhoto from "../UploadPhoto/UploadPhoto";
import GetUserPosts from "../getUserPosts/GetUserPosts";
import ChangePassword from "../ChangePassword/ChangePassword";
import { Helmet } from "react-helmet";

export default function Profile() {
  function getUserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }
  let { data, isLoading, isError, error } = useQuery({
    queryKey: [`getUserData`],
    queryFn: getUserData,
    select: (data) => data.data.user,
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
        <title>Profile</title>
      </Helmet>
      <div className="container w-[30%] mx-auto mt-40 bg-gray-600 rounded-3xl ">
        <div className="image">
          <img src={data.photo} alt="image"></img>
        </div>
        <div className="info text-center text-white">
          <p>Name:{data.name}</p>
          <p>Email:{data.email}</p>
          <p>Gender:{data.gender}</p>
        </div>
        <div className="photo grid grid-cols-1 sm:grid-cols-2">
          <div className="one w-full p-3">
            <UploadPhoto />
          </div>
          <div className="two w-full p-3">
            <ChangePassword />
          </div>
        </div>
      </div>
      <GetUserPosts id={data._id} />
    </>
  );
}
