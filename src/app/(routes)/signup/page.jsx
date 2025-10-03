"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import api from "@/app/api/axios";
import { useRouter } from "next/navigation";

// ✅ Signup schema (mirror of your backend Zod schema)
const signupSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  company: z.string().min(2, "Company name is required"),
});

export default function SignupPage() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const res = await api.post("/api/user/signup", formData);
      setToken(res.data.data.otpToken);
      toast.success("Signup successful!");
      setShowOtpModal(true);
    } catch (err) {
      console.log("Signup failed:", err.message);
    }
  };

  const handleOtpOk = () => {
    setShowOtpModal(false);
    router.push(`/otp`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white px-4 overflow-x-hidden">
      {/* Signup Form */}
      <div className="w-full max-w-md rounded-2xl bg-neutral-900 p-8 shadow-xl relative z-10 ">
        {/* 🔹 Logo Area */}
        <div className="flex justify-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-[8rem] w-[8rem] w-auto"
          />
        </div>

        <h1 className="mb-6 text-center text-3xl font-bold">Create Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              {...register("username")}
              className="w-full rounded-md border border-gray-600 bg-black px-3 py-2 text-white focus:border-white focus:outline-none"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

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

          {/* Company */}
          <div>
            <label className="block text-sm mb-1">Company</label>
            <input
              type="text"
              {...register("company")}
              className="w-full rounded-md border border-gray-600 bg-black px-3 py-2 text-white focus:border-white focus:outline-none"
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">
                {errors.company.message}
              </p>
            )}
          </div>

          {/* Terms & Conditions */}
          <p className="text-xs text-gray-400">
            By signing up, you agree to our{" "}
            <a href="/terms" className="underline hover:text-white">
              Terms & Conditions
            </a>
            .
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-white py-2 font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Login Link */}
          <div className="mt-4 text-center">
            <span className="text-gray-400">Already have an account? </span>
            <a
              href="/login"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Login
            </a>
          </div>
        </form>
      </div>

      {/* 🔹 OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">OTP Sent</h2>
            <p className="text-gray-300 mb-6">
              Please check your email for the OTP to verify your account.
            </p>
            <button
              onClick={handleOtpOk}
              className="w-full rounded-md bg-white py-2 font-semibold text-black hover:bg-gray-200"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
