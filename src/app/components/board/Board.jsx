"use client";
import api from "@/app/api/axios";
import BoardHeader from "@/app/components/BoardHeader";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import BoardLayout from "./BoardLayout";

const Board = ({ id }) => {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/board/getBoard/${id}`, {
          withCredentials: true,
        });
        setBoard(res.data.data.board);
      } catch (err) {
        console.error("Error fetching board:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
      ) : (
        <BoardLayout title={board.title} />
      )}
    </>
  );
};

export default Board;
