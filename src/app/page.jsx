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
import axios from "axios";
import api from "./api/axios";

const gradients = [
  "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
  "bg-gradient-to-r from-teal-400 to-blue-500",
  "bg-gradient-to-r from-orange-500 to-red-500",
  "bg-gradient-to-r from-green-400 to-emerald-600",
  "bg-gradient-to-r from-yellow-400 to-orange-500",
];

const boardsMock = [
  {
    id: 1,
    title: "Project Alpha",
    description: "This is the first project board",
  },
  {
    id: 2,
    title: "Design Sprint",
    description: "UI/UX design tasks and planning",
  },
  { id: 3, title: "Marketing", description: "Campaign tasks and schedules" },
];

const boardSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

export default function BoardsPage() {
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(boardSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/board/createBoard", data, {
        withCredentials: true,
      });
      console.log("Board created:", res.data);
      // close the dialog
      setOpen(false);
      // refresh the boards list
      const boardsRes = await api.get("/board/getAllBoardsOfUser", {
        withCredentials: true,
      });
      setBoards(boardsRes.data.data.boards);
    } catch (err) {
      console.error(err.message);
    }
  };
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
                <form
                  className="flex flex-col gap-4 mt-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    type="text"
                    placeholder="Board Title"
                    {...register("title")}
                    className="w-full rounded-md px-3 py-2 bg-neutral-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs">
                      {errors.title.message}
                    </p>
                  )}
                  <textarea
                    placeholder="Board Description"
                    {...register("description")}
                    className="w-full rounded-md px-3 py-2 bg-neutral-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs">
                      {errors.description.message}
                    </p>
                  )}
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
