import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreatePost() {
  let [isLoading, SetisLoading] = useState(false);
  let { register, handleSubmit } = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });
  function handleCreatePost(value) {
    SetisLoading(true);
    // 🔑 Build FormData
    const formData = new FormData();
    formData.append("image", value.image[0]); // photo[0] = first file chosen
    formData.append("body", value.body);
    axios
      .post(`https://linked-posts.routemisr.com/posts`, formData, {
        headers: {
          token: localStorage.getItem("userToken"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        SetisLoading(false);
      })
      .catch((err) => {
        SetisLoading(false);
      });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleCreatePost)}
        className="max-w-sm mx-auto"
      >
        <div className="mb-5">
          <label
            htmlFor="body"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            body
          </label>
          <input
            {...register("body")}
            type="text"
            id="body"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            upload image
          </label>
          <input
            {...register("image")}
            type="file"
            id="image"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        {isLoading ? (
          <i class="fa-solid fa-spinner fa-spin"></i>
        ) : (
          <button
            disabled={isLoading}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        )}
      </form>
    </>
  );
}
