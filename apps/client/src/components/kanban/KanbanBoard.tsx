import Column from './Column';
import { useBoard } from '@/hooks/useBoard';

const KanbanBoard = () => {
  const { data: board, isLoading, error } = useBoard();

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
    <div className="flex gap-4 overflow-x-auto p-4">
      {board.columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};

export default KanbanBoard;
