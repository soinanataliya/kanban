import { useState } from 'react';
import type { UseMutationResult } from '@tanstack/react-query';

type Props = {
  title: string;
  updateBoardTitle: UseMutationResult<
    unknown,
    Error,
    { title: string },
    unknown
  >;
};

const BoardTitleSection = ({ title, updateBoardTitle }: Props) => {
  const [draft, setDraft] = useState(title);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    if (!draft.trim()) return;
    updateBoardTitle.mutate({ title: draft });
    setEditing(false);
  };

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        Board
      </h2>

      {editing ? (
        <div className="flex gap-2">
          <input
            className="flex-1 rounded border px-3 py-2 text-sm"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && handleSave()}
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
            onClick={() => {
              setDraft(title);
              setEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">{title}</span>
          <button
            className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50"
            onClick={() => {
              setDraft(title);
              setEditing(true);
            }}
          >
            Edit
          </button>
        </div>
      )}
    </section>
  );
};

export default BoardTitleSection;
