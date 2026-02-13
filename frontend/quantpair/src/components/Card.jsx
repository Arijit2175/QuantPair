export default function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}