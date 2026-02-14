import { useBoard } from '@/hooks/useBoard'

const KanbanPage = () => {
  const { data: board, isLoading, error } = useBoard()

  if (isLoading) {
    return <div>Loading board…</div>
  }

  if (error) {
    return <div>Error loading board</div>
  }

  if (!board) {
    return <div>No boards</div>
  }

  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      {board.columns.map((column) => (
        <div
          key={column.id}
          className="flex w-72 shrink-0 flex-col rounded-lg bg-gray-100 p-3"
        >
          <div className="mb-3 text-sm font-semibold text-gray-700">
            {column.title}
          </div>

          <div className="flex flex-col gap-2">
            {column.cards.map((card) => (
              <div
                key={card.id}
                className="rounded-md bg-white p-3 text-sm shadow"
              >
                {card.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default KanbanPage
