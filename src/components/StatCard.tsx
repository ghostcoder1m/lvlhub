import React from 'react';

interface StatCardProps {
  number: string;
  label: string;
}

export default function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-2xl rounded-xl px-8 py-6 min-w-[200px] text-center border border-blue-100/40 hover:border-blue-200/60 transition-all duration-500 hover:shadow-[0_24px_48px_rgb(234,88,12,0.25),_0_8px_16px_rgba(234,88,12,0.2)] hover:shadow-orange-500/30 hover:[transform:perspective(2000px)_rotateX(15deg)_rotateY(-10deg)_translateZ(40px)_scale(1.05)] hover:bg-gradient-to-br hover:from-white hover:to-blue-100/90 overflow-hidden hover:-translate-y-2 animate-glow">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-purple-500/[0.02] to-pink-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="text-5xl font-black bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300 animate-gradient drop-shadow-sm group-hover:[transform:translateZ(20px)]">{number}</div>
        <div className="text-gray-600 font-medium tracking-wide text-lg group-hover:[transform:translateZ(10px)] transition-transform duration-300">{label}</div>
      </div>
    </div>
  );
} 