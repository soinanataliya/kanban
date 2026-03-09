import { createFileRoute } from '@tanstack/react-router'
import KanbanBoard from '../components/kanban/KanbanBoard'

export const Route = createFileRoute('/kanban')({
  component: KanbanPage,
})

function KanbanPage() {

  return <KanbanBoard />
}
