import { useState } from 'react';
import type { UseMutationResult } from '@tanstack/react-query';

type BoardColumn = {
  id: string;
  title: string;
};

type Props = {
  columns: BoardColumn[];
  updateColumn: UseMutationResult<
    unknown,
    Error,
    { id: string; title: string },
    unknown
  >;
  createColumn: UseMutationResult<
    unknown,
    Error,
    { title: string },
    unknown
  >;
  deleteColumn: UseMutationResult<
    unknown,
    Error,
    { id: string },
    unknown
  >;
};

const ColumnSection = ({
  columns,
  updateColumn,
  createColumn,
  deleteColumn,
}: Props) => {
  const [editing, setEditing] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [pendingNew, setPendingNew] = useState<string[]>([]);
  const [pendingDeleteIds, setPendingDeleteIds] = useState<string[]>([]);

  const startEditing = () => {
    setDrafts(Object.fromEntries(columns.map((col) => [col.id, col.title])));
    setPendingNew([]);
    setPendingDeleteIds([]);
    setEditing(true);
  };

  const cancelEditing = () => {
    setDrafts({});
    setPendingNew([]);
    setPendingDeleteIds([]);
    setEditing(false);
  };

  const saveEditing = () => {
    columns.forEach((col) => {
      if (pendingDeleteIds.includes(col.id)) return;
      const draft = drafts[col.id];
      if (draft && draft.trim() && draft.trim() !== col.title) {
        updateColumn.mutate({ id: col.id, title: draft.trim() });
      }
    });
    pendingNew.forEach((title) => {
      if (title.trim()) {
        createColumn.mutate({ title: title.trim() });
      }
    });
    pendingDeleteIds.forEach((id) => {
      deleteColumn.mutate({ id });
    });
    setEditing(false);
    setDrafts({});
    setPendingNew([]);
    setPendingDeleteIds([]);
  };

  const handleAdd = () => {
    const trimmed = newColumnTitle.trim();
    if (!trimmed) return;
    setPendingNew((prev) => [...prev, trimmed]);
    setNewColumnTitle('');
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Columns
        </h2>
        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                className="rounded bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600"
                onClick={saveEditing}
              >
                Save
              </button>
              <button
                className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50"
                onClick={cancelEditing}
              >
                Cancel
              </button>
            </>
          ) : (
            columns.length > 0 && (
              <button
                className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50"
                onClick={startEditing}
              >
                Edit
              </button>
            )
          )}
        </div>
      </div>

      <div className="space-y-2">
        {columns
          .filter((col) => !pendingDeleteIds.includes(col.id))
          .map((column) =>
            editing ? (
              <div
                key={column.id}
                className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2"
              >
                <input
                  className="flex-1 rounded border border-blue-400 px-2 py-1 text-sm outline-none"
                  value={drafts[column.id] ?? column.title}
                  onChange={(event) =>
                    setDrafts((prev) => ({
                      ...prev,
                      [column.id]: event.target.value,
                    }))
                  }
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') saveEditing();
                    if (event.key === 'Escape') cancelEditing();
                  }}
                  autoFocus
                />
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Delete column "${column.title}" and all its cards?`,
                      )
                    ) {
                      setPendingDeleteIds((prev) => [...prev, column.id]);
                    }
                  }}
                  className="rounded px-2 py-1 text-xs text-gray-400 hover:bg-red-50 hover:text-red-500"
                >
                  Delete
                </button>
              </div>
            ) : (
              <div
                key={column.id}
                className="rounded-lg border bg-white px-3 py-2"
              >
                <span className="text-sm">{column.title}</span>
              </div>
            ),
          )}
        {editing &&
          pendingNew.map((title, index) => (
            <div
              key={`new-${index}`}
              className="flex items-center gap-2 rounded-lg border border-dashed border-green-300 bg-green-50 px-3 py-2"
            >
              <span className="flex-1 text-sm text-green-700">{title}</span>
              <button
                onClick={() =>
                  setPendingNew((prev) => prev.filter((_, i) => i !== index))
                }
                className="rounded px-2 py-1 text-xs text-gray-400 hover:bg-red-50 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
      </div>

      {editing && (
        <div className="flex gap-2">
          <input
            className="flex-1 rounded border px-3 py-2 text-sm"
            placeholder="New column name"
            value={newColumnTitle}
            onChange={(event) => setNewColumnTitle(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && handleAdd()}
          />
          <button
            className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      )}
    </section>
  );
};

export default ColumnSection;
