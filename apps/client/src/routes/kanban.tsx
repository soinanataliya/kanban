import { createFileRoute } from '@tanstack/react-router';
import KanbanPage from '@/components/KanbanPage';

export const Route = createFileRoute('/kanban')({
  component: KanbanPage,
})
