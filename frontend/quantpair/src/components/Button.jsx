export default function Button({ text, onClick, type = "primary", buttonType, ...props }) {
  const base =
    "px-5 py-2 rounded-lg font-semibold transition-all duration-200";

  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button className={`${base} ${styles[type]}`} onClick={onClick} type={buttonType || "button"} {...props}>
      {text}
    </button>
  );
}