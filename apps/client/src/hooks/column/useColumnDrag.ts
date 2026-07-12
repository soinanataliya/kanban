import { useRef, useState } from 'react';
import { calculateColumnDropIndex } from './calculateColumnDropIndex';
import type { UseMutationResult } from '@tanstack/react-query';
import type { MoveColumnMutation, MoveColumnMutationVariables } from '@/gql/graphql';

type MoveColumnMutationFn = UseMutationResult<
  MoveColumnMutation,
  Error,
  MoveColumnMutationVariables
>['mutate'];

export function useColumnDrag(
  boardRef: React.RefObject<HTMLDivElement | null>,
  moveColumnMutate: MoveColumnMutationFn,
) {
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const dropIndexRef = useRef(0);
  const isColumnDraggingRef = useRef(false);

  const handleColumnDragStart = () => {
    isColumnDraggingRef.current = true;
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();

    if (!isColumnDraggingRef.current) return;

    const container = boardRef.current;
    if (!container) return;

    const columnRects = Array.from(container.children)
      .filter((el) => !el.hasAttribute('data-placeholder'))
      .map((el) => el.getBoundingClientRect());

    const idx = calculateColumnDropIndex(columnRects, event.clientX);
    dropIndexRef.current = idx;
    setDropIndex(idx);
  };

  const handleDrop = (event: React.DragEvent) => {
    const columnId = event.dataTransfer.getData('columnId');
    if (!columnId) return;

    isColumnDraggingRef.current = false;
    setDropIndex(null);

    moveColumnMutate({ columnId, targetIndex: dropIndexRef.current });
  };

  const handleDragEnd = () => {
    isColumnDraggingRef.current = false;
    setDropIndex(null);
  };

  return {
    dropIndex,
    handleColumnDragStart,
    dragHandlers: {
      onDragOver: handleDragOver,
      onDrop: handleDrop,
      onDragEnd: handleDragEnd,
    },
  };
}
