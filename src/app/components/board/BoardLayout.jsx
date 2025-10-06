"use client";
import { useMemo, useState } from "react";
import BoardHeader from "../BoardHeader";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  pointerWithin,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableList from "./SortableList";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

const gradients = [
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-cyan-400 via-sky-500 to-blue-600",
  "from-emerald-400 via-teal-500 to-green-600",
  "from-rose-400 via-pink-500 to-red-600",
  "from-orange-300 via-amber-400 to-yellow-500",
  "from-fuchsia-400 via-violet-500 to-indigo-600",
  "from-slate-400 via-gray-600 to-slate-800",
];

export default function BoardLayout({ title, initialLists }) {
  const [activeId, setActiveId] = useState(null);
  const [lists, setLists] = useState(initialLists);

  // Setup sensors for drag activation
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } })
  );

  const gradient = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    return gradients[randomIndex];
  }, []);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over?.id) {
      setLists((prevLists) => {
        const oldIndex = prevLists.findIndex((l) => l.id === active.id);
        const newIndex = prevLists.findIndex((l) => l.id === over.id);
        return arrayMove(prevLists, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  return (
    <div
      className={`flex flex-col bg-gradient-to-br ${gradient} 
      min-h-[91.9vh] text-white overflow-hidden`}
    >
      <BoardHeader title={title} />

      <div
        className="flex-1 bg-white/10 backdrop-blur-md rounded-t-2xl 
        p-6 flex items-start gap-4 overflow-x-auto overflow-y-hidden
        transition-all duration-300"
      >
        <DndContext
          sensors={sensors}
          modifiers={[restrictToWindowEdges]}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={lists.map((l) => l.id)}
            strategy={horizontalListSortingStrategy}
          >
            {lists.map((list) => (
              <SortableList key={list.id} id={list.id} title={list.title} />
            ))}
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <SortableList
                id={activeId}
                title={lists.find((l) => l.id === activeId)?.title}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
