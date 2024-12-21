import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-lg border border-blue-100/40 hover:shadow-[0_24px_48px_rgb(234,88,12,0.2),_0_12px_24px_rgba(234,88,12,0.15),_0_8px_16px_rgba(234,88,12,0.1)] transition-all duration-500 hover:border-blue-200/60 hover:bg-gradient-to-br hover:from-white hover:to-blue-100/90 overflow-hidden hover:-translate-y-4 hover:[transform:perspective(2000px)_rotateX(10deg)_rotateY(-15deg)_translateZ(40px)_scale(1.05)] animate-glow transform opacity-100 translate-y-0">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.08] via-purple-500/[0.06] to-pink-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm" />
      <div className="relative z-10">
        <div className="relative bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-xl p-4 w-fit mb-6 group-hover:[transform:perspective(1000px)_rotateX(20deg)_rotateY(-10deg)_translateZ(20px)] transition-transform duration-500 overflow-hidden">
          <div className="relative transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:[transform:translateZ(30px)] transition-transform duration-300">{title}</h3>
        <p className="text-gray-600 leading-relaxed group-hover:[transform:translateZ(20px)] transition-transform duration-300">{description}</p>
      </div>
    </div>
  );
} 