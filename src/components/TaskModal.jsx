import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

export function TaskModal({ task, onSave, onClose }) {
  const [text, setText] = useState(task?.text || '');
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);

  const shortcuts = [
    { key: 'up', quadrant: 'DO_FIRST', label: 'Do first', color: 'bg-emerald-500', icon: <ArrowUp size={16} /> },
    { key: 'right', quadrant: 'DO_LATER', label: 'Do later', color: 'bg-cyan-500', icon: <ArrowRight size={16} /> },
    { key: 'left', quadrant: 'DELEGATE', label: 'Delegate', color: 'bg-yellow-500', icon: <ArrowLeft size={16} /> },
    { key: 'down', quadrant: 'ELIMINATE', label: 'Eliminate', color: 'bg-red-500', icon: <ArrowDown size={16} /> },
  ];

  useEffect(() => {
    if (showShortcuts) {
      const handleKeyDown = (e) => {
        if (e.shiftKey) {
          switch (e.key) {
            case 'ArrowUp':
              setSelectedQuadrant('DO_FIRST');
              break;
            case 'ArrowRight':
              setSelectedQuadrant('DO_LATER');
              break;
            case 'ArrowLeft':
              setSelectedQuadrant('DELEGATE');
              break;
            case 'ArrowDown':
              setSelectedQuadrant('ELIMINATE');
              break;
            default:
              break;
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [showShortcuts]);

  useEffect(() => {
    if (selectedQuadrant) {
      onSave({ text, quadrant: selectedQuadrant });
      onClose();
    }
  }, [selectedQuadrant]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      setShowShortcuts(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        {!showShortcuts ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-100 mb-6">
              Add tasks
            </h2>
            
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-gray-800 text-gray-100 rounded-lg p-3 mb-6"
                placeholder="Task name"
                autoFocus
                required
              />
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-red-500 hover:text-red-400"
                >
                  CLOSE
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-800 text-gray-100 rounded-lg hover:bg-gray-700"
                >
                  Continue
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-100 mb-6">
              Add tasks
            </h2>
            
            {shortcuts.map((shortcut) => (
              <div
                key={shortcut.key}
                className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                onClick={() => setSelectedQuadrant(shortcut.quadrant)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Shift ⇧ + Arrow {shortcut.icon}</span>
                </div>
                <button className={`px-4 py-2 text-gray-900 rounded-lg ${shortcut.color}`}>
                  {shortcut.label}
                </button>
              </div>
            ))}
            
            <div className="flex justify-between mt-6">
              <button
                onClick={onClose}
                className="text-red-500 hover:text-red-400"
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}