"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/app/api/axios"; // notice: no setAccessToken import
import Image from "next/image";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/features/auth/authSlice";

// ✅ Login schema
const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/api/user/login", data, {
        withCredentials: true,
      });
      const token = res.data.data.accessToken;
      const user = res.data.data.user;
      dispatch(loginSuccess(user)); // ✅ store user data in Redux
      console.log("User data:", user);

      // ✅  put token in localStorage
      localStorage.setItem("accessToken", token);

      toast.success("Login successful!");
      await delay(2000);
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white px-4 overflow-x-hidden">
      {/* Login Form */}
      <div className="w-full max-w-md rounded-2xl bg-neutral-900 p-8 shadow-xl relative z-10">
        {/* 🔹 Logo */}
        <div className="flex justify-center ">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={128}
            height={128}
            className="h-[8rem] w-[8rem]"
            unoptimized
          />
        </div>

        <h1 className="mb-6 text-center text-3xl font-bold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full rounded-md border border-gray-600 bg-black px-3 py-2 text-white focus:border-white focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full rounded-md border border-gray-600 bg-black px-3 py-2 text-white focus:border-white focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-white py-2 font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
          >
            {isSubmitting ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-4 text-center">
          <span className="text-gray-400">Don’t have an account? </span>
          <Link
            href="/signup"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
