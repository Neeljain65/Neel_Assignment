import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskItem } from './TaskItem';

export function Quadrant({ config, tasks, onEdit, onDelete }) {
  const { setNodeRef } = useDroppable({ id: config.id });

  return (
    <div className="flex-1 min-h-[300px] p-4 border-gray-800 border-r border-b last:border-r-0 [&:nth-child(-n+2)]:border-b-1">
      <div className={`text-center lg:w-52  mx-auto px-4 py-2 rounded-lg mb-4 ${config.bgColor} ${config.textColor}`}>
        {config.title}
      </div>
      
      <div ref={setNodeRef} className="h-full">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}