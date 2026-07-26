import { createFileRoute } from '@tanstack/react-router';
import { useBoard } from '@/hooks/board/useBoard';
import { useUpdateBoardTitle } from '@/hooks/board/useUpdateBoardTitle';
import { useResetBoard } from '@/hooks/board/useResetBoard';
import { useUpdateColumn } from '@/hooks/column/useUpdateColumn';
import { useCreateColumn } from '@/hooks/column/useCreateColumn';
import { useDeleteColumn } from '@/hooks/column/useDeleteColumn';
import BoardTitleSection from '@/components/settings/BoardTitleSection';
import ColumnSection from '@/components/settings/ColumnSection';

export const Route = createFileRoute('/settings')({
  component: Settings,
});

function Settings() {
  const { data: board, isLoading } = useBoard();
  const updateBoardTitle = useUpdateBoardTitle();
  const resetBoard = useResetBoard();
  const updateColumn = useUpdateColumn();
  const createColumn = useCreateColumn();
  const deleteColumn = useDeleteColumn();

  if (isLoading) return <div className="p-6">Loading…</div>;
  if (!board) return <div className="p-6">No board found</div>;

  const totalCards = board.columns.reduce(
    (sum, col) => sum + col.cards.length,
    0,
  );

  return (
    <div className="p-6 max-w-lg space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>

      <BoardTitleSection
        title={board.title}
        updateBoardTitle={updateBoardTitle}
      />

      <ColumnSection
        columns={board.columns}
        updateColumn={updateColumn}
        createColumn={createColumn}
        deleteColumn={deleteColumn}
      />

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
          onClick={() => {
            if (window.confirm('Reset board to default? All data will be lost.')) {
              resetBoard.mutate();
            }
          }}
        >
          Reset board to default
        </button>
      </section>
    </div>
  );
}
