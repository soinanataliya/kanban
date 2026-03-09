
import AddCardForm from './AddCardForm';
import Card from './Card';
import { useMoveCard } from '@/hooks/useMoveCard';

type CardType = {
  id: string;
  title: string;
  order: number;
}

type ColumnType = {
  id: string;
  title: string;
  order: number;
  cards: CardType[];
}

type Props = {
  column: ColumnType;
}

const Column = ({ column }: Props) => {

  const moveCard = useMoveCard();

const handleDrop = (event: React.DragEvent) => {
  const cardId = event.dataTransfer.getData('cardId');
  const fromColumnId = event.dataTransfer.getData('fromColumnId');

  moveCard.mutate({
    cardId,
    fromColumnId,
    targetColumnId: column.id,
  });
};
  

  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      className="flex w-72 shrink-0 flex-col rounded-lg bg-gray-100 p-3"
    >
      <div className="mb-3 text-sm font-semibold">{column.title}</div>

      <div className="flex flex-col gap-2">
        {column.cards.map((card) => (
          <Card key={card.id} card={card} columnId={column.id} />
        ))}
      </div>

      <AddCardForm columnId={column.id} />
    </div>
  )
}

export default Column;