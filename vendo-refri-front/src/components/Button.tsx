type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 12px",
        margin: "4px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}