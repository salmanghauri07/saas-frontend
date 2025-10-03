"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/app/api/axios";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export default function OtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const onSubmit = async (formData) => {
    try {
      const res = await api.post("/api/user/verifyOTP", formData);
      toast.success("✅ OTP verified successfully!");
      await delay(2000);
      router.push("/login");
    } catch (err) {
      console.error("OTP verification error:", err);
    }
  };

  const handleResendOtp = async () => {
    try {
      const token = searchParams.get("token"); // 👈 your JWT token

      const res = await api.get(`/api/user/resendOTP/${token}`);

      toast.success("✅ OTP resent!");
    } catch (err) {
      console.error("OTP resend error:", err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white px-4 overflow-x-hidden">
      {/* OTP Card */}
      <div className="w-full max-w-md rounded-2xl bg-neutral-900 p-8 shadow-xl relative z-10">
        {/* 🔹 Logo Area (same as signup) */}
        <div className="flex justify-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-[8rem] w-[8rem] w-auto"
          />
        </div>

        <h1 className="mb-4 text-center text-3xl font-bold">Verify Account</h1>
        <p className="mb-6 text-center text-gray-400 text-sm">
          Enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* OTP Input */}
          <div>
            <label className="block text-sm mb-1">OTP Code</label>
            <input
              type="text"
              maxLength={6}
              {...register("otp")}
              className="w-full rounded-md border border-gray-600 bg-black px-3 py-2 text-center text-lg tracking-widest text-white focus:border-white focus:outline-none"
              placeholder="••••••"
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-white py-2 font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">Didn’t receive the code?</p>
          <button
            type="button"
            onClick={handleResendOtp}
            className="text-blue-400 underline hover:text-blue-300 text-sm mt-1"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}
