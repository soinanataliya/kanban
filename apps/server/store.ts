
  const uid = () => {
  return crypto.randomUUID()
}

export type Card = {
  id: string
  title: string
  description?: string
  order: number
}

export type Column = {
  id: string
  title: string
  order: number
  cards: Card[]
}

export type Board = {
  id: string
  title: string
  columns: Column[]
}

export const board: Board = {
  id: 'board-1',
  title: 'My Kanban Board',
  columns: [],
}

export function createColumn(title: string) {
  const column: Column = {
    id: uid(),
    title,
    order: board.columns.length,
    cards: [],
  }
  board.columns.push(column)
  return column
}

export function createCard(columnId: string, title: string) {
  const column = board.columns.find((c) => c.id === columnId)
  if (!column) throw new Error('Column not found')

  const card: Card = {
    id: uid(),
    title,
    order: column.cards.length,
  }

  column.cards.push(card)
  return card
}

export function seedBoard() {
  if (board.columns.length > 0) {
    return // for hot-reload
  }

  const todo = createColumn('Todo');
  const inProgress = createColumn('In Progress');
  const done = createColumn('Done');

  createCard(todo.id, 'Set up project');
  createCard(todo.id, 'Create GraphQL schema');

  createCard(inProgress.id, 'Implement kanban UI');

  createCard(done.id, 'Drink coffee');
}