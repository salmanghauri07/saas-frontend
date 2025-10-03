"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import api from "../api/axios";

const boardSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

export default function CreateNewBoardModal({ open, setOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(boardSchema),
  });

  const createNewBoard = async (data) => {
    try {
      const res = await api.post("/board/createBoard", data, {
        withCredentials: true,
      });
      toast.success("Board created successfully!");
      setOpen(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-neutral-900 text-white border border-gray-700">
        <DialogHeader>
          <DialogTitle>Create New Board</DialogTitle>
        </DialogHeader>

        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit(createNewBoard)}
        >
          <input
            type="text"
            placeholder="Board Title"
            {...register("title", { required: "Title is required" })}
            className="w-full rounded-md px-3 py-2 bg-neutral-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}

          <textarea
            placeholder="Board Description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full rounded-md px-3 py-2 bg-neutral-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
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
  );
}
