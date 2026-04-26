type Props = {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

export default function Input({
  placeholder,
  value,
  onChange,
  type = "text",
}: Props) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={onChange}
      style={{
        display: "block",
        margin: "5px 0",
        padding: "8px",
      }}
    />
  );
}