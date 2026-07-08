import { Link, createFileRoute } from '@tanstack/react-router';
import { useBoard } from '@/hooks/useBoard';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
  const { data: board, isLoading } = useBoard();

  if (isLoading) return <div className="p-6">Loading…</div>;
  if (!board) return <div className="p-6">No board found</div>;

  const totalCards = board.columns.reduce(
    (sum, col) => sum + col.cards.length,
    0,
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{board.title}</h1>
        <Link
          to="/kanban"
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
        >
          Open board
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {board.columns.map((column) => (
          <div key={column.id} className="rounded-lg border bg-white p-4">
            <div className="text-sm text-gray-500">{column.title}</div>
            <div className="mt-1 text-3xl font-bold">{column.cards.length}</div>
            <div className="mt-2 flex flex-wrap gap-1">
              {column.cards.slice(0, 5).map((card) => (
                <span
                  key={card.id}
                  className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                >
                  {card.title}
                </span>
              ))}
              {column.cards.length > 5 && (
                <span className="text-xs text-gray-400">
                  +{column.cards.length - 5} more
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-500">
        {board.columns.length} columns · {totalCards} cards
      </div>
    </div>
  );
}
