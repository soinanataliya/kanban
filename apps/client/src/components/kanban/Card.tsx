import { useRef, useState } from 'react';
import { useDeleteCard } from '@/hooks/card/useDeleteCard';
import { useUpdateCard } from '@/hooks/card/useUpdateCard';
import CheckIcon from '@/components/ui/CheckIcon';
import PencilIcon from '@/components/ui/PencilIcon';

type CardType = {
  id: string;
  title: string;
  order: number;
};

type Props = {
  card: CardType;
  columnId: string;
};

const Card = ({ card, columnId }: Props) => {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(card.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const deleteCard = useDeleteCard();
  const updateCard = useUpdateCard();

  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('cardId', card.id);
    event.dataTransfer.setData('fromColumnId', columnId);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${card.title}"?`)) {
      deleteCard.mutate({ cardId: card.id });
    }
  };

  const startEditing = () => {
    setEditTitle(card.title);
    setEditing(true);
    requestAnimationFrame(() => inputRef.current?.select());
  };

  const saveEdit = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== card.title) {
      updateCard.mutate({ id: card.id, title: trimmed });
    }
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditTitle(card.title);
    setEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      saveEdit();
    } else if (event.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div
      draggable={!editing}
      onDragStart={handleDragStart}
      className="group relative rounded bg-white p-3 text-sm shadow"
    >
      <div className={editing ? '' : 'pr-14'}>
        {editing ? (
          <div className="flex items-center gap-1">
            <input
              ref={inputRef}
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
              onBlur={saveEdit}
              onKeyDown={handleKeyDown}
              className="min-w-0 flex-1 rounded border border-blue-400 px-1 py-0.5 text-sm outline-none"
            />
            <span className="ml-auto" />
            <button
              onMouseDown={(event) => event.preventDefault()}
              onClick={saveEdit}
              className="rounded p-1 text-gray-400 hover:text-green-500"
            >
              <CheckIcon className="size-3.5" />
            </button>
            <button
              onMouseDown={(event) => event.preventDefault()}
              onClick={cancelEdit}
              className="rounded p-1 text-gray-400 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        ) : (
          <div onDoubleClick={startEditing}>
            {card.title}
          </div>
        )}
      </div>
      {!editing && (
        <div className="absolute right-1 top-1 hidden gap-0.5 group-hover:flex">
          <button
            onClick={startEditing}
            className="rounded p-1 text-gray-400 hover:bg-blue-50 hover:text-blue-500"
          >
            <PencilIcon className="size-3.5" />
          </button>
          <button
            onClick={handleDelete}
            className="rounded px-1.5 text-xs text-gray-400 hover:bg-red-50 hover:text-red-500"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
