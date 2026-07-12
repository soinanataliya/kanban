import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useBoard } from '@/hooks/board/useBoard';
import { useUpdateBoardTitle } from '@/hooks/board/useUpdateBoardTitle';
import { useResetBoard } from '@/hooks/board/useResetBoard';

export const Route = createFileRoute('/settings')({
  component: Settings,
});

function Settings() {
  const { data: board, isLoading } = useBoard();
  const updateBoardTitle = useUpdateBoardTitle();
  const resetBoard = useResetBoard();
  const [title, setTitle] = useState('');
  const [editing, setEditing] = useState(false);

  if (isLoading) return <div className="p-6">Loading…</div>;
  if (!board) return <div className="p-6">No board found</div>;

  const totalCards = board.columns.reduce(
    (sum, col) => sum + col.cards.length,
    0,
  );

  const handleSave = () => {
    if (!title.trim()) return;
    updateBoardTitle.mutate({ title });
    setEditing(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset board to default? All data will be lost.')) {
      resetBoard.mutate();
    }
  };

  return (
    <div className="p-6 max-w-lg space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Board
        </h2>

        {editing ? (
          <div className="flex gap-2">
            <input
              className="flex-1 rounded border px-3 py-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
            />
            <button
              className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="rounded border px-4 py-2 text-sm hover:bg-gray-50"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">{board.title}</span>
            <button
              className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50"
              onClick={() => {
                setTitle(board.title);
                setEditing(true);
              }}
            >
              Edit
            </button>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Statistics
        </h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border bg-white p-3">
            <div className="text-gray-500">Columns</div>
            <div className="text-xl font-bold">{board.columns.length}</div>
          </div>
          <div className="rounded-lg border bg-white p-3">
            <div className="text-gray-500">Cards</div>
            <div className="text-xl font-bold">{totalCards}</div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Danger Zone
        </h2>
        <button
          className="rounded border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          onClick={handleReset}
        >
          Reset board to default
        </button>
      </section>
    </div>
  );
}
