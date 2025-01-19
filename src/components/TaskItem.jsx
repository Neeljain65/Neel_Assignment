import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Pencil, Trash2, GripVertical } from 'lucide-react';

export function TaskItem({ task, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group flex items-center gap-2 bg-gray-800 rounded-lg p-3 mb-2"
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none text-gray-500 hover:text-gray-400"
      >
        <GripVertical size={20} />
      </button>
      
      <p className="flex-1 text-gray-200">{task.text}</p>
      
      <button
        onClick={() => onEdit(task)}
        className="text-gray-500 hover:text-gray-400"
      >
        <Pencil size={20} />
      </button>
      
      <button
        onClick={() => onDelete(task.id)}
        className="text-gray-500 hover:text-gray-400"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}