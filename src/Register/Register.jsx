import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
export default function Register() {
  const [isloading, setIsloading] = useState(false);
  let navigate = useNavigate();
  const schema = z
    .object({
      name: z.string().nonempty("Name is required"),
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "at least one uppercase,one lowercase,one number,one special Character,minimum length 8 character",
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .nonempty("Date of birth is required")
        .transform((str) => new Date(str)) // example "1999-8-25" => August 25 1999
        .refine(
          (date) =>
            date <=
            new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
          { message: "You must be at least 18 years old" },
        ),
      gender: z.enum(["male", "female"]),
    })
    .refine((object) => object.password === object.rePassword, {
      message: "Passwords must match",
      path: ["rePassword"],
    });

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
  });
  function handleRegister(values) {
    console.log(values);
    setIsloading(true);
    axios
      .post(`https://linked-posts.routemisr.com/users/signup`, values)
      .then((res) => {
        console.log(res);
        navigate("/Login");
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
        <title>Register</title>
      </Helmet>
      <div className="w-[90%] md:w-[50%] bg-white shadow-lg rounded-3xl border border-gray-300 mx-auto my-16 p-10">
        <h2 className="text-2xl font-semibold text-center mb-8">Register</h2>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          <div className="relative z-0 w-full group">
            <input
              type="text"
              {...register("name")}
              id="floating_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_name"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>

            {formState.errors.name && formState.touchedFields.name && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full group">
            <input
              type="email"
              {...register("email")}
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>

            {formState.errors.email && formState.touchedFields.email && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full group">
            <input
              type="password"
              {...register("password")}
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>

            {formState.errors.password && formState.touchedFields.password && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full group">
            <input
              type="password"
              {...register("rePassword")}
              id="floating_repassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_repassword"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm Password
            </label>
          </div>

          <div>
            <label className="text-sm text-gray-600">Date of birth</label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className="w-full mt-1 border-b-2 border-gray-300 focus:border-blue-600 outline-none py-2"
            />

            {formState.errors.dateOfBirth &&
              formState.touchedFields.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.dateOfBirth.message}
                </p>
              )}
          </div>

          <div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-600 mb-2">Gender</p>

              <div className="flex gap-6 justify-center">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    {...register("gender")}
                    value="male"
                    className="accent-blue-600"
                  />
                  Male
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    {...register("gender")}
                    value="female"
                    className="accent-blue-600"
                  />
                  Female
                </label>
              </div>
            </div>

            {formState.errors.gender && formState.touchedFields.gender && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.gender.message}
              </p>
            )}
          </div>

          <div className="pt-4 text-center">
            {isloading ? (
              <i className="fa-solid fa-spinner fa-spin text-2xl text-blue-600"></i>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
