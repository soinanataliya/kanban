type CardType = {
  id: string;
  title: string;
  order: number;
}

type Props = {
  card: CardType;
  columnId: string;
}

const Card = ({ card, columnId }: Props) => {
  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('cardId', card.id)
    event.dataTransfer.setData('fromColumnId', columnId)
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="cursor-grab rounded bg-white p-3 text-sm shadow"
    >
      {card.title}
    </div>
  )
}

export default Card