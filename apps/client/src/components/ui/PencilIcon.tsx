type Props = {
  className?: string;
};

const PencilIcon = ({ className }: Props) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zM13.5 6.207 9.793 2.5 3.44 8.854a.5.5 0 0 0-.122.194l-.966 2.74a.5.5 0 0 0 .637.637l2.74-.966a.5.5 0 0 0 .194-.122L13.5 6.207zM.646 11.146a.5.5 0 0 0-.354.854l2.06 2.06a.5.5 0 0 0 .708-.708l-2.06-2.06a.5.5 0 0 0-.354-.146z" />
  </svg>
);

export default PencilIcon;
