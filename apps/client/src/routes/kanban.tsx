import { createFileRoute } from '@tanstack/react-router';
import KanbanPlaceholder from '@/components/KanbanPlaceholder';

export const Route = createFileRoute('/kanban')({
  component: KanbanPlaceholder,
})
