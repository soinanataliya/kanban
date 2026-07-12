type Props = {
  className?: string;
};

const GripIcon = ({ className }: Props) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M7 2a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0V2ZM7 7a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0V7ZM7 12a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Z" />
  </svg>
);

export default GripIcon;
