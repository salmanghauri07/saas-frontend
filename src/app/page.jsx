"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Navbar from "./components/Navbar";
import api from "./api/axios";
import CreateNewBoardModal from "./components/CreateBoardModal";
import { useRouter } from "next/navigation";

const gradients = [
  "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
  "bg-gradient-to-r from-teal-400 to-blue-500",
  "bg-gradient-to-r from-orange-500 to-red-500",
  "bg-gradient-to-r from-green-400 to-emerald-600",
  "bg-gradient-to-r from-yellow-400 to-orange-500",
];

export default function BoardsPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get("/board/getAllBoardsOfUser", {
        withCredentials: true,
      });
      setBoards(res.data.data.boards);
    })();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-neutral-900">
        <div className="container min-h-screen  text-white p-6">
          {/* Boards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {boards.map((board, index) => (
              <div
                key={board._id}
                className={`rounded-2xl p-6 shadow-lg cursor-pointer transition transform hover:scale-105 hover:shadow-xl ${
                  gradients[index % gradients.length]
                }`}
                onClick={() => router.push(`/board/${board._id}`)}
              >
                <h2 className="text-xl font-semibold mb-2">{board.title}</h2>
                <p className="text-sm opacity-90 line-clamp-2">
                  {board.description}
                </p>
              </div>
            ))}

            {/* Create New Board */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-600 p-6 text-gray-400 hover:text-white hover:border-white cursor-pointer transition">
                  <span className="text-lg font-medium">
                    + Create New Board
                  </span>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-neutral-900 text-white border border-gray-700">
                <DialogHeader>
                  <DialogTitle>Create New Board</DialogTitle>
                </DialogHeader>

                <CreateNewBoardModal open={open} setOpen={setOpen} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
