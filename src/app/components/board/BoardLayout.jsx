"use client";
import { useMemo } from "react";
import BoardHeader from "../BoardHeader";

const gradients = [
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-cyan-400 via-sky-500 to-blue-600",
  "from-emerald-400 via-teal-500 to-green-600",
  "from-rose-400 via-pink-500 to-red-600",
  "from-orange-300 via-amber-400 to-yellow-500",
  "from-fuchsia-400 via-violet-500 to-indigo-600",
  "from-slate-400 via-gray-600 to-slate-800",
];

export default function BoardLayout({ children, title }) {
  const gradient = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
  }, []);

  return (
    <div
      className={`flex flex-col bg-gradient-to-br ${gradient} 
      min-h-screen border border-white/40 text-white overflow-hidden`}
    >
      {/* Board Header */}
      <BoardHeader title={title} />

      {/* Board Content */}
      <div
        className="flex-1 bg-white/10 backdrop-blur-md rounded-t-2xl 
        p-6 flex items-start gap-4 overflow-x-auto overflow-y-hidden
        transition-all duration-300"
      >
        {children ? children : <DefaultList />}
      </div>
    </div>
  );
}

/* 🧩 Default Trello-like List */
function DefaultList() {
  return (
    <div className="min-w-[260px] bg-white/15 border border-white/10 rounded-xl shadow-md p-4 text-white backdrop-blur-sm flex-shrink-0">
      <h3 className="font-semibold text-lg mb-3">Getting Started</h3>
      <ul className="space-y-2 text-sm">
        <li className="bg-white/10 rounded-md px-3 py-2">
          Click + to add a new list
        </li>
        <li className="bg-white/10 rounded-md px-3 py-2">
          Drag cards to reorder them
        </li>
        <li className="bg-white/10 rounded-md px-3 py-2">
          Invite your team members
        </li>
      </ul>
      <button className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white py-1.5 rounded-md text-sm font-medium transition">
        + Add a list
      </button>
    </div>
  );
}
