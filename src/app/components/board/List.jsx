"use client";
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";

export default function List({ id, title, cards = [], onDelete }) {
  // droppable area for cards (for later use when we add cards)
  const { setNodeRef, isOver } = useDroppable({
    id: `droppable-${id}`,
  });

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-white transition-all duration-200 min-w-[250px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg truncate max-w-[160px]">
          {title}
        </h3>

        {/* Three dots menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="List options"
            className="p-1 rounded-full hover:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v.01M12 12v.01M12 18v.01"
              />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute left-0 mt-2 w-36 bg-white/10 rounded-md shadow-lg z-10">
              <button
                className="w-full text-left px-3 py-2 hover:bg-white/20"
                onClick={() => {
                  onDelete?.();
                  setMenuOpen(false);
                }}
              >
                Delete list
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cards container (droppable area) */}
      <div
        ref={setNodeRef}
        className={`min-h-[60px] rounded-md p-2 transition-colors duration-150 ${
          isOver ? "bg-white/30" : "bg-white/10"
        }`}
      >
        {cards.length === 0 ? (
          <div className="text-sm text-white/80">No cards yet</div>
        ) : (
          cards.map((c) => (
            <div
              key={c.id}
              className="bg-white/20 rounded-md p-2 mb-2 text-sm text-white/90"
            >
              {c.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
