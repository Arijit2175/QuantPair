import React, { memo } from "react";

const Card = ({ title, value }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group animate-fade-in-up">
      <h3 className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-3 group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-3xl font-bold text-white font-mono">{value}</p>
      <div className="h-1 w-0 bg-gradient-to-r from-cyan-400 to-cyan-600 mt-4 group-hover:w-full transition-all duration-300 rounded-full"></div>
    </div>
  );
}
export default memo(Card);