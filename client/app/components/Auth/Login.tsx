"use client";

import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email!")
    .required("Please enter your email!"),

  password: Yup.string()
    .min(6, "Password must contain at least 6 characters!")
    .required("Please enter your password!"),
});

const Login: FC<Props> = ({ setRoute,setOpen }) => {
  const [show, setShow] = useState(false);
  const [login,{isSuccess,data,error}] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: schema,

    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if(isSuccess){
      toast.success("Login successful");
      setOpen(false)
    }
    if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  },[isSuccess,error,setOpen]);

  const {
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  return (
    <div className="w-full">
      <h1 className={styles.title}>Login to ELearning</h1>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className={styles.label}>
            Enter your email
          </label>

          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="loginmail@gmail.com"
            className={`${
              errors.email && touched.email ? "border-red-500" : ""
            } ${styles.input}`}
          />

          {errors.email && touched.email && (
            <span className="block pt-2 text-red-500">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="relative mb-1 mt-5 w-full">
          <label htmlFor="password" className={styles.label}>
            Enter your password
          </label>

          <input
            type={show ? "text" : "password"}
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
            className={`${
              errors.password && touched.password ? "border-red-500" : ""
            } ${styles.input}`}
          />

          {show ? (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-10 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-10 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          )}

          {errors.password && touched.password && (
            <span className="block pt-2 text-red-500">
              {errors.password}
            </span>
          )}
        </div>

        <div className="mt-5 w-full">
          <input
            type="submit"
            value="Login"
            className={styles.button}
          />
        </div>

        <h5 className="pt-4 text-center font-Poppins text-[14px] text-black dark:text-white">
          Or login with
        </h5>

        <div className="my-3 flex items-center justify-center">
          <FcGoogle 
          size={30} 
          className="mr-2 cursor-pointer" 
          onClick={() => signIn("google")}
          />
          <AiFillGithub 
          size={30} 
          className="ml-2 cursor-pointer" 
          onClick={() => signIn("github")}
          />
        </div>

        <h5 className="pt-4 text-center font-Poppins text-[14px]">
          Don&apos;t have an account?{" "}
          <span
            className="cursor-pointer pl-1 text-[#2190ff]"
            onClick={() => setRoute("Sign-Up")}
          >
            Sign Up
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;