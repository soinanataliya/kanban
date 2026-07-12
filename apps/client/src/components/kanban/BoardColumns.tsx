import Column from './Column';
import type { BoardQuery } from '@/gql/graphql';

type ColumnType = BoardQuery['board']['columns'][number];

type Props = {
  columns: ColumnType[];
  dropIndex: number | null;
  isEditing: boolean;
  onColumnDragStart: () => void;
};

const Placeholder = () => (
  <div
    data-placeholder
    className="w-1.5 shrink-0 self-stretch rounded-full bg-blue-500 shadow-sm"
  />
);

const BoardColumns = ({ columns, dropIndex, isEditing, onColumnDragStart }: Props) => {
  const items: React.ReactNode[] = [];

  columns.forEach((column, i) => {
    if (dropIndex === i) {
      items.push(<Placeholder key={`placeholder-${i}`} />);
    }
    items.push(
      <Column
        key={column.id}
        column={column}
        isEditing={isEditing}
        onColumnDragStart={onColumnDragStart}
      />,
    );
  });

  if (dropIndex === columns.length) {
    items.push(<Placeholder key="placeholder-end" />);
  }

  return items;
};

export default BoardColumns;
