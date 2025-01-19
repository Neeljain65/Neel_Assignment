import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Moon, Plus } from 'lucide-react';
import { Quadrant } from './components/Quadrant';
import { TaskModal } from './components/TaskModal';
import { TaskItem } from './components/TaskItem';
import { Menu, X } from "lucide-react";
const QUADRANT_CONFIG = [
  {
    id: 'DO_FIRST',
    title: 'DO FIRST',
    bgColor: 'bg-emerald-900',
    textColor: 'text-emerald-100',
  },
  {
    id: 'DO_LATER',
    title: 'DO LATER',
    bgColor: 'bg-cyan-900',
    textColor: 'text-cyan-100',
  },
  {
    id: 'DELEGATE',
    title: 'DELEGATE',
    bgColor: 'bg-yellow-900',
    textColor: 'text-yellow-100',
  },
  {
    id: 'ELIMINATE',
    title: 'ELIMINATE',
    bgColor: 'bg-red-900',
    textColor: 'text-red-100',
  },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [editingTask, setEditingTask] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragStart = (event) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    setActiveTask(null);
    
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overQuadrant = QUADRANT_CONFIG.find((q) => q.id === over.id);

    if (activeTask && overQuadrant) {
      setTasks((tasks) =>
        tasks.map((t) =>
          t.id === activeTask.id
            ? { ...t, quadrant: overQuadrant.id }
            : t
        )
      );
    }
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks((tasks) =>
        tasks.map((t) =>
          t.id === editingTask.id
            ? { ...t, ...taskData }
            : t
        )
      );
    } else {
      const newTask = {
        id: crypto.randomUUID(),
        ...taskData,
      };
      setTasks((tasks) => [...tasks, newTask]);
    }
  };

  const handleDeleteTask = (id) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== id));
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen overflow-x-auto  bg-black text-gray-100 w-screen">
    <header className="border-b px-2 border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-sm" />
                <div className="w-2 h-2 bg-cyan-500 rounded-sm" />
                <div className="w-2 h-2 bg-yellow-500 rounded-sm" />
                <div className="w-2 h-2 bg-red-500 rounded-sm" />
              </div>
              <h1 className="text-xl font-semibold">supertasks.io</h1>
            </div>
            <span className="px-2 py-1 text-sm bg-gray-800 rounded">BETA</span>
          </div>

          {/* Hamburger Menu for Smaller Screens */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-800 rounded-full"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } sm:flex flex-col sm:flex-row items-center sm:gap-6 absolute sm:relative bg-black sm:bg-transparent top-16 sm:top-auto left-0 w-full sm:w-auto p-4 sm:p-0 border-t border-gray-800 sm:border-none`}
          >
            <a
              href="#"
              className="block sm:inline-block hover:text-gray-300 mb-2 sm:mb-0"
            >
              Workspaces
            </a>
            <a
              href="#"
              className="block sm:inline-block hover:text-gray-300 mb-2 sm:mb-0"
            >
              About
            </a>
            <a
              href="#"
              className="block sm:inline-block hover:text-gray-300 mb-2 sm:mb-0"
            >
              Pricing
            </a>
            <a
              href="#"
              className="block sm:inline-block hover:text-gray-300"
            >
              Feedback
            </a>
            <button className="px-4 py-2  rounded-lg">
              Login
            </button>
          </nav>

        </div>
      </div>
    </header>
  
      <main className="container mx-auto   relative">
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          <div className="grid grid-cols-2 gap-0 border border-gray-800">
            {QUADRANT_CONFIG.map((config) => (
              <Quadrant
                key={config.id}
                config={config}
                tasks={tasks.filter((t) => t.quadrant === config.id)}
                onEdit={(task) => {
                  setEditingTask(task);
                  setIsModalOpen(true);
                }}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask && (
              <TaskItem
                task={activeTask}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            )}
          </DragOverlay>
        </DndContext>

        <button
          onClick={() => {
            setEditingTask(undefined);
            setIsModalOpen(true);
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        >
          <Plus size={24} />
        </button>
      </main>

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(undefined);
          }}
        />
      )}
    </div>
  );
}

export default App;