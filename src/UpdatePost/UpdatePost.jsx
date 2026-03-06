import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function UpdatePost({ id }) {
  const queryClient=useQueryClient();
  // let [isLoading, SetisLoading] = useState(false);
  const [Spinner, setisLoading] = useState(false);
  const [Show, isShow] = useState(false);
  let { register, handleSubmit } = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });
  function handleUpdatePost(value) {
    setisLoading(true);
    // 🔑 Build FormData
    const formData = new FormData();
    formData.append("image", value.image[0]); // photo[0] = first file chosen

    axios
      .put(`https://linked-posts.routemisr.com/posts/${id}`, formData, {
        headers: {
          token: localStorage.getItem("userToken"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("✅ Created successfully:", res.data);
        queryClient.invalidateQueries({queryKey:['getUserPosts']})
        setisLoading(false);
        isShow(false)
      })
      .catch((err) => {
        console.error("❌ Upload error:", err);
        setisLoading(false);
      });
  }
  return (
    <>
      <div>
        {/* Modal toggle */}
        <button
          onClick={() => isShow(true)}
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
          className="bg-blue-700 w-[48%] p-2 text-white rounded-xl font-bold me-7 cursor-pointer hover:to-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
          type="button"
        >
          Update post
        </button>
        {Show && (
          <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Sign in to our platform
                  </h3>
                  <button
                    onClick={() => isShow(false)}
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-4 md:p-5">
                  <form
                    onSubmit={handleSubmit(handleUpdatePost)}
                    className="space-y-4"
                    action="#"
                  >
                    <div>
                      <label
                        htmlFor="body"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your body
                      </label>
                      <input
                        {...register("body")}
                        type="text"
                        id="body"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="photo"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your image
                      </label>
                      <input
                        {...register("image")}
                        type="file"
                        id="photo"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    {Spinner ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      <button className="text-white bg-blue-500 p-3 rounded-3xl ">
                        Submit
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
