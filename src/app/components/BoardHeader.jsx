"use client";

import { useState } from "react";
import { Filter, UserPlus } from "lucide-react";

export default function BoardHeader({ title }) {
  return (
    <div
      className=" flex items-center justify-between px-6 py-3 
      backdrop-blur-md bg-white/10 dark:bg-black/20 border-b border-white/10 shadow-sm "
    >
      {/* Left: Board Title */}
      <h1 className="text-xl font-semibold text-white truncate max-w-[60%]">
        {title}
      </h1>

      {/* Right: Buttons */}
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl 
          bg-white/10 hover:bg-white/20 text-sm text-white font-medium
          transition-all duration-200 backdrop-blur-sm"
        >
          <Filter size={18} />
          Filter
        </button>

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl 
          bg-blue-600 hover:bg-blue-700 text-sm text-white font-medium
          transition-all duration-200"
        >
          <UserPlus size={18} />
          Invite
        </button>
      </div>
    </div>
  );
}
