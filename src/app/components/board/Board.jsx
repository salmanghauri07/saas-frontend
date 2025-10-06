"use client";
import api from "@/app/api/axios";
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
        // Passing lists from board data (or fallback dummy lists)
        <BoardLayout
          title={board.title}
          initialLists={
            board.lists || [
              { id: "list-1", title: "To Do" },
              { id: "list-2", title: "In Progress" },
              { id: "list-3", title: "Done" },
            ]
          }
        />
      )}
    </>
  );
};

export default Board;
