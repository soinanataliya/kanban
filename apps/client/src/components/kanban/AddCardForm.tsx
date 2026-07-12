import { useState } from 'react';
import { useCreateCard } from '@/hooks/card/useCreateCard';

type Props = {
  columnId: string;
};

const AddCardForm = ({ columnId }: Props) => {
  const [title, setTitle] = useState('');
  const createCard = useCreateCard();

  const handleSubmit = () => {
    if (!title.trim()) {
      return;
    }

    createCard.mutate({
      columnId,
      title,
    });

    setTitle('');
  };

  return (
    <div className="mt-3 flex flex-col gap-2">
      <input
        className="rounded border p-2 text-sm"
        placeholder="New card title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <button
        className="rounded bg-blue-500 p-2 text-sm text-white"
        onClick={handleSubmit}
      >
        Add card
      </button>
    </div>
  );
};

export default AddCardForm;
