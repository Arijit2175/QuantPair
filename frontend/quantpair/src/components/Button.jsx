export default function Button({ text, onClick, type = "primary", buttonType, ...props }) {
  const base =
    "px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 font-sans";

  const styles = {
    primary: "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg hover:shadow-cyan-500/30 active:scale-95",
    secondary: "bg-slate-700 text-white hover:bg-slate-600 border border-slate-600 transition-colors",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-red-600/30 active:scale-95",
  };

  return (
    <button className={`${base} ${styles[type]}`} onClick={onClick} type={buttonType || "button"} {...props}>
      {text}
    </button>
  );
}