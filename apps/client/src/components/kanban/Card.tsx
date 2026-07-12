import { useDeleteCard } from '@/hooks/card/useDeleteCard';

type CardType = {
  id: string;
  title: string;
  order: number;
};

type Props = {
  card: CardType;
  columnId: string;
};

const Card = ({ card, columnId }: Props) => {
  const deleteCard = useDeleteCard();

  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('cardId', card.id);
    event.dataTransfer.setData('fromColumnId', columnId);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${card.title}"?`)) {
      deleteCard.mutate({ cardId: card.id });
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="group relative cursor-grab rounded bg-white p-3 text-sm shadow"
    >
      <div className="pr-6">{card.title}</div>
      <button
        onClick={handleDelete}
        className="absolute right-2 top-2 hidden rounded px-1.5 text-xs text-gray-400 hover:bg-red-50 hover:text-red-500 group-hover:block"
      >
        ✕
      </button>
    </div>
  );
};

export default Card;
