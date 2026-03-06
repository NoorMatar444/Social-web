import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function UpdateComment({ id }) {
  const queryClient = useQueryClient();
  let [isLoading, SetisLoading] = useState(false);
  const [Show, isShow] = useState(false);
  let { register, handleSubmit } = useForm({
    defaultValues: {
      content: "",
    },
  });
  function handleUpdateComment(value) {
    SetisLoading(true);
    axios
      .put(`https://linked-posts.routemisr.com/comments/${id}`, value, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log("✅ Updated successfully:", res.data);
        queryClient.invalidateQueries({ queryKey: [`getUserPosts`] });
        queryClient.invalidateQueries({ queryKey: [`getsinglepost`] });
        isShow(false);
        SetisLoading(false);
      })
      .catch((err) => {
        console.error("❌ Update error:", err);
        SetisLoading(false);
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
          className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-white rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md transition-all duration-300 hover:from-indigo-500 hover:to-blue-700 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="button"
        >
          Update comment
        </button>
        {/* Main modal */}
        {Show && (
          <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
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
                    onSubmit={handleSubmit(handleUpdateComment)}
                    className="space-y-4"
                    action="#"
                  >
                    <div>
                      <label
                        htmlFor="comment"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your comment
                      </label>
                      <input
                        {...register("content")}
                        type="text"
                        id="comment"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    {isLoading ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
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
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
