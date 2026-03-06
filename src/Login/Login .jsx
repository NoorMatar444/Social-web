import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isloading, setIsloading] = useState(false);
  let navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "john@example.com",
      password: "Abc123@d",
    },
  });
  function handleLogin(values) {
    console.log(values);
    setIsloading(true);
    axios
      .post(`api/users/signin`, values)
      .then((res) => {
        console.log(res);
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          navigate("/");
        }
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  }
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="card w-[90%] md:w-[50%] bg-white shadow-lg rounded-3xl border border-gray-300 mx-auto mt-20 p-10">
        <h2 className="text-2xl font-semibold text-center mb-8">Login</h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          
          <div className="relative z-0 w-full group">
            <input
              type="email"
              {...register("email")}
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>

            {formState.errors.email && formState.touchedFields.email ? (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.email.message}
              </p>
            ) : (
              ""
            )}
          </div>

          
          <div className="relative z-0 w-full group">
            <input
              type="password"
              {...register("password")}
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              autoComplete="off"
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>

            {formState.errors.password && formState.touchedFields.password ? (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.password.message}
              </p>
            ) : (
              ""
            )}
          </div>

          
          <div className="text-center pt-4">
            {isloading ? (
              <i className="fa-solid fa-spinner fa-spin text-2xl text-blue-600"></i>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
