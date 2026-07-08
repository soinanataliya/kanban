import { useRef } from 'react';
import AddCardForm from './AddCardForm';
import Card from './Card';
import { useMoveCard } from '@/hooks/useMoveCard';
import { calculateDropIndex } from '@/hooks/calculateDropIndex';

type CardType = {
  id: string;
  title: string;
  order: number;
};

type ColumnType = {
  id: string;
  title: string;
  order: number;
  cards: CardType[];
};

type Props = {
  column: ColumnType;
};

const Column = ({ column }: Props) => {
  const moveCard = useMoveCard();
  const dropIndexRef = useRef(0);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();

    const container = cardsContainerRef.current;
    if (!container) return;

    const cardRects = Array.from(container.children).map((el) =>
      el.getBoundingClientRect(),
    );
    const mouseY = event.clientY;

    dropIndexRef.current = calculateDropIndex(cardRects, mouseY);
  };

  const handleDrop = (event: React.DragEvent) => {
    const cardId = event.dataTransfer.getData('cardId');
    const fromColumnId = event.dataTransfer.getData('fromColumnId');

    moveCard.mutate({
      cardId,
      fromColumnId,
      targetColumnId: column.id,
      dropIndex: dropIndexRef.current,
    });
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="flex w-72 shrink-0 flex-col rounded-lg bg-gray-100 p-3"
    >
      <div className="mb-3 text-sm font-semibold">{column.title}</div>

      <div ref={cardsContainerRef} className="flex flex-col gap-2">
        {column.cards.map((card) => (
          <Card key={card.id} card={card} columnId={column.id} />
        ))}
      </div>

      <AddCardForm columnId={column.id} />
    </div>
  );
};

export default Column;
