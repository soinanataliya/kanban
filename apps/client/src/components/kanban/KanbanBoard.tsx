import { useRef, useState } from 'react';
import BoardColumns from './BoardColumns';
import { useBoard } from '@/hooks/board/useBoard';
import { useMoveColumn } from '@/hooks/column/useMoveColumn';
import { useColumnDrag } from '@/hooks/column/useColumnDrag';

const KanbanBoard = () => {
  const { data: board, isLoading, error } = useBoard();
  const moveColumn = useMoveColumn();
  const boardRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { dropIndex, handleColumnDragStart, dragHandlers } = useColumnDrag(
    boardRef,
    moveColumn.mutate,
  );

  if (isLoading) {
    return <div>Loading board…</div>;
  }

  if (error) {
    return <div>Error loading board</div>;
  }

  if (!board) {
    return <div>No boards</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 border-b px-4 py-2">
        <span className="text-sm font-medium">{board.title}</span>
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className={`ml-auto rounded px-3 py-1 text-xs font-medium transition-colors ${
            isEditing
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          {isEditing ? 'Done Editing' : 'Edit Board'}
        </button>
      </div>

      <div
        ref={boardRef}
        {...dragHandlers}
        className="flex gap-4 overflow-x-auto p-4"
      >
        <BoardColumns
          columns={board.columns}
          dropIndex={dropIndex}
          isEditing={isEditing}
          onColumnDragStart={handleColumnDragStart}
        />
      </div>
    </div>
  );
};

export default KanbanBoard;
