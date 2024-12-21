import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, X, ArrowRight, BarChart2, Brain, Briefcase, Shield, CheckCircle2, Globe, Zap, Users, Trophy, ChevronRight, Clock, Star, Sparkles, Target, Gauge, MessageSquare } from 'lucide-react';

// Add animations
const floatAnimation = {
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-20px)' },
  },
};

const floatDelayAnimation = {
  '@keyframes floatDelay': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-20px)' },
  },
};

// Add styles to tailwind
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  // Add parallax effect
  const parallaxEffect = `
    @keyframes parallax {
      0% { transform: translateY(0); }
      100% { transform: translateY(-20px); }
    }
    .parallax {
      animation: parallax 15s ease-in-out infinite alternate;
    }
  `;
  // Enhanced animations
  const enhancedAnimations = `
    @keyframes shine {
      0% { background-position: 200% center; filter: brightness(1); }
      50% { background-position: 0% center; filter: brightness(1.3); }
      100% { background-position: -200% center; filter: brightness(1); }
      0% { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
    @keyframes morph {
      0%, 100% { border-radius: 60% 40% 30% 70%/60% 30% 70% 40%; }
      50% { border-radius: 30% 60% 70% 40%/50% 60% 30% 60%; }
    }
    .animate-shine {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      background-size: 200% 100%;
      animation: shine 6s linear infinite;
    }
    .animate-morph {
      animation: morph 8s ease-in-out infinite;
    }
  `;
  // Add logo animation
  const logoAnimation = `
    @keyframes rocket-float {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(2px, -2px) rotate(2deg); }
      75% { transform: translate(-2px, 2px) rotate(-2deg); }
    }
    @keyframes logo-glow {
      0%, 100% { text-shadow: 0 0 20px rgba(79, 70, 229, 0.1); }
      50% { text-shadow: 0 0 30px rgba(79, 70, 229, 0.2); }
    }
    .animate-rocket {
      animation: rocket-float 3s ease-in-out infinite;
    }
    .logo-glow {
      animation: logo-glow 3s ease-in-out infinite;
    }
  `;
  style.textContent = `
    html {
      scroll-behavior: smooth;
    ${parallaxEffect}
    ${enhancedAnimations}
    ${logoAnimation}
    }
    
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 0.8; }
    }
    @keyframes pulse-slow-delay {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 0.8; }
    }
    .animate-pulse-slow {
      animation: pulse-slow 6s ease-in-out infinite;
    }
    .animate-pulse-slow-delay {
      animation: pulse-slow 6s ease-in-out infinite;
      animation-delay: -3s;
    }
    @keyframes gradient {
      0% { background-position: 0% 50%; background-size: 400% 400%; filter: hue-rotate(0deg) brightness(1); }
      25% { background-position: 50% 25%; background-size: 450% 450%; filter: hue-rotate(5deg) brightness(1.05); }
      50% { background-position: 100% 50%; background-size: 500% 500%; filter: hue-rotate(10deg) brightness(1.1); }
      75% { background-position: 50% 75%; background-size: 450% 450%; filter: hue-rotate(5deg) brightness(1.05); }
      100% { background-position: 0% 50%; background-size: 400% 400%; filter: hue-rotate(0deg) brightness(1); }
      0% { background-position: 0% 50%; background-size: 200% 200%; }
      25% { background-position: 50% 25%; background-size: 225% 225%; }
      50% { background-position: 100% 50%; background-size: 250% 250%; }
      75% { background-position: 50% 75%; background-size: 225% 225%; }
      100% { background-position: 0% 50%; background-size: 200% 200%; }
    }
    @keyframes gradientFlow {
      0% { background-position: 0% 50%; filter: hue-rotate(0deg) brightness(1.2) saturate(1.2) contrast(1.1); }
      25% { background-position: 25% 50%; filter: hue-rotate(5deg) brightness(1.3) saturate(1.3) contrast(1.15); }
      50% { background-position: 100% 50%; filter: hue-rotate(10deg) brightness(1.4) saturate(1.4) contrast(1.2); }
      75% { background-position: 75% 50%; filter: hue-rotate(5deg) brightness(1.3) saturate(1.3) contrast(1.15); }
      100% { background-position: 0% 50%; filter: hue-rotate(0deg) brightness(1.2) saturate(1.2) contrast(1.1); }
      0% { background-position: 0% 50%; filter: hue-rotate(0deg) brightness(1.2) saturate(1.2); }
      25% { background-position: 25% 50%; filter: hue-rotate(5deg) brightness(1.3) saturate(1.3); }
      50% { background-position: 100% 50%; filter: hue-rotate(10deg) brightness(1.4) saturate(1.4); }
      75% { background-position: 75% 50%; filter: hue-rotate(5deg) brightness(1.3) saturate(1.3); }
      100% { background-position: 0% 50%; filter: hue-rotate(0deg) brightness(1.2) saturate(1.2); }
      0% { background-position: 0% 50%; filter: hue-rotate(0deg) brightness(1.1); }
      25% { background-position: 25% 50%; filter: hue-rotate(5deg) brightness(1.15); }
      50% { background-position: 100% 50%; filter: hue-rotate(10deg) brightness(1.2); }
      75% { background-position: 75% 50%; filter: hue-rotate(5deg) brightness(1.15); }
      100% { background-position: 0% 50%; filter: hue-rotate(0deg) brightness(1.1); }
      0% { background-position: 0% 50%; filter: hue-rotate(0deg) brightness(1); }
      25% { background-position: 25% 50%; filter: hue-rotate(5deg) brightness(1.05); }
      50% { background-position: 100% 50%; filter: hue-rotate(10deg) brightness(1.1); }
      75% { background-position: 75% 50%; filter: hue-rotate(5deg) brightness(1.05); }
      100% { background-position: 0% 50%; filter: hue-rotate(0deg) brightness(1); }
      0% { background-position: 0% 50%; filter: hue-rotate(0deg); }
      50% { background-position: 100% 50%; filter: hue-rotate(10deg); }
      100% { background-position: 0% 50%; filter: hue-rotate(0deg); }
    }
    .animate-gradient-flow {
      background-size: 200% auto;
      animation: gradientFlow 15s ease infinite;
      transition: all 0.5s ease-in-out;
    }
    .animate-gradient-flow:hover {
      animation-duration: 15s;
      filter: brightness(1.1);
    }
    @keyframes glow {
      0%, 100% { filter: brightness(1) saturate(1); }
      50% { filter: brightness(1.2) saturate(1.3); }
    }
    .animate-glow {
      animation: glow 3s ease-in-out infinite;
    }
    @keyframes morph {
      0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(0deg) scale(1); }
      25% { border-radius: 40% 60% 70% 30% / 30% 60% 40% 70%; transform: rotate(5deg) scale(1.1); }
      50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: rotate(0deg) scale(1); }
      75% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(-5deg) scale(0.9); }
    }
    @keyframes shimmer {
      0% { transform: translateX(-100%) rotate(-45deg); filter: blur(0px); }
      50% { filter: blur(1px); }
      100% { transform: translateX(200%) rotate(-45deg); filter: blur(0px); }
      0% { transform: translateX(-100%) rotate(-45deg); }
      100% { transform: translateX(200%) rotate(-45deg); }
    }
    .animate-shimmer {
      position: relative;
      overflow: hidden;
    }
    .animate-shimmer::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      animation: shimmer 2s infinite;
    }
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 12s ease-in-out infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    @keyframes floatDelay {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-float-delay {
      animation: floatDelay 6s ease-in-out infinite;
      animation-delay: -3s;
    }
  `;
  document.head.appendChild(style);
}

export default function Landing() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isScrollingToSection, setIsScrollingToSection] = useState(false);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [showChat, setShowChat] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-8">
      <div className="h-12 bg-gray-200 rounded w-2/3"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="h-48 bg-gray-200 rounded"></div>
    </div>
  );

  useEffect(() => {
    // Clear any existing timeout on unmount
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Preload critical images for smooth transitions
    const imagesToPreload = [
      '/50c4d322-aa8e-4319-bb0b-237bf1e90498/view-3d-space-rocket-model (1).png',
      '/50c4d322-aa8e-4319-bb0b-237bf1e90498/3d-graph-computer-illustration.jpg'
    ];
    
    let loaded = 0;
    const totalImages = imagesToPreload.length;

    const loadImages = async () => {
      try {
        await Promise.all(
          imagesToPreload.map(src => {
            return new Promise<void>((resolve, reject) => {  // Add <void> type here
              const img = new Image();
              img.onload = () => {
                loaded++;
                setLoadProgress((loaded / totalImages) * 100);
                resolve();
              };
              img.onerror = reject;
              img.src = src;
            });
          })
        );
        // Add a minimum loading time for better UX
        loadingTimeoutRef.current = setTimeout(() => {
          setImagesLoaded(true);
          setIsLoaded(true);
        }, 800); // Minimum loading time of 800ms
      } catch (error) {
        console.error('Error loading images:', error);
        // Still show the page even if images fail to load
        setImagesLoaded(true);
        setIsLoaded(true);
      }
    };

    loadImages();
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
      }
      scrollRef.current = window.scrollY;
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setScrollPosition(scrollRef.current);
        setIsScrolling(false);
      });
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const parallaxStyle = (factor: number) => ({
    transform: `translateY(${scrollPosition * factor}px)`,
    transition: `transform ${isScrolling ? '50ms' : '300ms'} cubic-bezier(0.4, 0, 0.2, 1)`
  });
  const scrollToSection = useCallback((id: string) => {
    setIsScrollingToSection(true);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // Reset scrolling state after animation
      setTimeout(() => setIsScrollingToSection(false), 1000);
    }
  }, []);

  return (
    <div className={`min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50 via-white to-orange-100 animate-gradient bg-fixed relative overflow-hidden selection:bg-blue-100/60 selection:text-blue-900 antialiased transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* News Ticker */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-2 px-4 text-sm font-bold overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          🎉 New AI Model Release - Enhanced Performance • 🚀 Marketing Automation 2.0 Launch • 💡 Join our upcoming webinar on AI Marketing Trends
        </div>
      </div>
      {/* Enhanced Background Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={parallaxStyle(0.1)}>
        {/* Enhanced Geometric Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-400/[0.15] via-orange-300/[0.1] to-transparent opacity-60 mix-blend-overlay animate-gradient-flow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-orange-300/[0.15] via-orange-200/[0.1] to-transparent opacity-60 mix-blend-multiply animate-gradient-flow" style={{ animationDelay: '-5s' }} />
        
        {/* Complex Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxNSAwIEwgMCAwIDAgMTUiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMzQsODgsMTIsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 [transform:perspective(1000px)_rotateX(30deg)] origin-top" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-orange-400/[0.2] via-orange-300/[0.15] to-orange-200/[0.1] rounded-full blur-3xl animate-pulse-slow transform hover:scale-110 transition-transform duration-1000" 
             style={{ transform: `rotate(${scrollPosition * 0.05}deg)` }} />
        <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-orange-300/[0.2] via-orange-200/[0.15] to-orange-100/[0.1] rounded-full blur-3xl animate-pulse-slow-delay transform hover:scale-110 transition-transform duration-1000"
             style={{ transform: `rotate(${-scrollPosition * 0.05}deg)` }} />
        
        {/* Dynamic Floating Elements */}
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-gradient-to-br from-orange-500/[0.15] via-orange-400/[0.1] to-orange-300/[0.05] rounded-[40%_60%_70%_30%/30%_30%_70%_70%] blur-2xl animate-morph"
             style={{ transform: `translate3d(${Math.sin(scrollPosition * 0.002) * 20}px, ${Math.cos(scrollPosition * 0.002) * 20}px, 0)` }} />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-orange-400/[0.15] via-orange-300/[0.1] to-orange-200/[0.05] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-2xl animate-morph" 
             style={{ transform: `translate3d(${-Math.sin(scrollPosition * 0.002) * 20}px, ${-Math.cos(scrollPosition * 0.002) * 20}px, 0)`, animationDelay: '-4s' }} />
        {/* Base gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-400/[0.4] via-orange-300/[0.3] to-transparent opacity-70 animate-gradient-flow animate-glow" />
        
        {/* Grid pattern with perspective */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB0cmFuc2Zvcm09InNrZXdZKC04KSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg3OSwgNzAsIDIyOSwgMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 transform hover:scale-105 hover:translate3d(0, -4px, 0) transition-transform duration-1000" />
        
        {/* Large floating orbs */}
        <div className="absolute -top-1/2 -right-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-orange-500/[0.35] via-orange-400/[0.25] to-orange-300/[0.08] rounded-full blur-3xl animate-pulse-slow transform hover:scale-110 transition-transform duration-1000" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-orange-400/[0.35] via-orange-300/[0.25] to-orange-200/[0.08] rounded-full blur-3xl animate-pulse-slow-delay transform hover:scale-110 transition-transform duration-1000" />
        
        {/* Medium floating elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-400/[0.3] via-orange-300/[0.2] to-orange-200/[0.1] rounded-full blur-2xl animate-float transform hover:scale-110 transition-transform duration-1000" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-orange-300/[0.3] via-orange-200/[0.2] to-orange-100/[0.1] rounded-full blur-2xl animate-float-delay transform hover:scale-110 transition-transform duration-1000" />
        
        {/* Small geometric shapes */}
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-orange-500/[0.12] via-orange-400/[0.09] to-orange-300/[0.06] rounded-xl transform rotate-12 animate-float blur-xl" />
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-orange-400/[0.12] via-orange-300/[0.09] to-orange-200/[0.06] rounded-full transform -rotate-12 animate-float-delay blur-xl" />
        
        {/* Isometric grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB0cmFuc2Zvcm09InNrZXdZKC0zMCkgc2tld1goMzApIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 transform hover:scale-105 transition-transform duration-1000" />
        
        {/* 3D Floating cubes */}
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-indigo-500/[0.07] via-purple-500/[0.06] to-pink-500/[0.05] rounded-xl transform rotate-45 [transform:perspective(1000px)_rotateX(45deg)_rotateY(45deg)] animate-float blur-sm" />
        <div className="absolute bottom-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-500/[0.07] via-fuchsia-500/[0.06] to-pink-500/[0.05] rounded-xl transform -rotate-45 [transform:perspective(1000px)_rotateX(-45deg)_rotateY(-45deg)] animate-float-delay blur-sm" />
      </div>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b-2 border-white/50 z-50 border-b border-slate-200/50 transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1) print:hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-1 group cursor-pointer relative p-2 rounded-xl transition-all duration-300 ease-out will-change-transform">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent transition-all duration-300 relative">
              <span className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-300/10 to-orange-200/0 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />LVLHUB
            </h1>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-400/20 to-orange-300/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150" />
              <img 
                src="/50c4d322-aa8e-4319-bb0b-237bf1e90498/view-3d-space-rocket-model (1).png" 
                alt="Rocket" 
                className="h-16 w-16 object-contain rotate-[60deg] group-hover:rotate-0 group-hover:scale-[1.25] group-hover:[transform:perspective(1500px)_rotateY(25deg)_translateZ(20px)] transition-all duration-700 ease-out hover:ease-in-out animate-rocket relative z-10 drop-shadow-xl -mt-2 -mr-2" 
              />
            </div>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="relative px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl border-2 border-orange-400/50 font-semibold shadow-sm hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-500 hover:translate3d(0, -4px, 0) hover:scale-105 active:scale-[0.98] text-sm tracking-wide overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out" />
            <span>Launch App</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4 md:px-8 relative scroll-smooth">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/[0.2] to-orange-300/[0.15] rounded-full blur-3xl animate-pulse-slow transform rotate-45" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/[0.05] to-pink-500/[0.05] rounded-full blur-3xl animate-pulse-slow-delay transform -rotate-45" />
        </div>
        {/* Animated Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-orange-500/[0.05] to-orange-400/[0.05] rounded-3xl rotate-12 animate-float" />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-purple-500/[0.03] to-blue-500/[0.03] rounded-full animate-float-delay" />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto mb-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start text-left relative z-10">
              <h2 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent tracking-tight [text-wrap:balance] mb-6 leading-[1.1]">
                Your Complete
                <span className="block mt-2 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  AI Marketing Agency
                </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-xl mb-10 font-semibold leading-relaxed">
                Experience autonomous marketing operations powered by AI. Your 24/7 expert marketing team that creates, executes, and optimizes campaigns while you focus on growth.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-semibold text-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] active:scale-[0.98] flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                aria-label="Get Started"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5 group-hover:translate3d(8px, 0, 0) group-hover:scale-110 transition-all duration-500 ease-out animate-gentle-bounce" />
              </button>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-3xl transform rotate-12 translate-x-4 translate-y-4 scale-[0.96] blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-fuchsia-500/20 rounded-3xl transform -rotate-6 -translate-x-2 -translate-y-2 scale-[0.98] blur-lg" />
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 overflow-hidden transform hover:scale-[1.02] hover:[transform:perspective(1000px)_rotateY(-10deg)_rotateX(10deg)] transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-full h-full">
                  {/* Main illustration container */}
                  <div className="relative w-full aspect-[4/3] group/illustration">
                    {/* Background effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-400/10 to-orange-300/10 rounded-3xl opacity-0 group-hover/illustration:opacity-100 transition-all duration-700 blur-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover/illustration:opacity-100 transition-all duration-700 blur-xl" />
                    
                    {/* The illustration */}
                    <img 
                      src="/50c4d322-aa8e-4319-bb0b-237bf1e90498/3d-graph-computer-illustration.jpg" 
                      alt="AI Marketing Analytics Dashboard" 
                      className="w-full h-full object-cover rounded-2xl shadow-lg transform group-hover/illustration:scale-105 group-hover/illustration:[transform:perspective(1000px)_rotateY(-5deg)_rotateX(5deg)_translateZ(20px)] transition-all duration-700 ease-out"
                    />
                    
                    {/* Floating elements */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-500/20 to-orange-400/20 rounded-full blur-2xl animate-float opacity-0 group-hover/illustration:opacity-100 transition-opacity duration-700" />
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-float-delay opacity-0 group-hover/illustration:opacity-100 transition-opacity duration-700" />
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-orange-500/10 to-orange-400/10 rounded-full blur-xl animate-pulse-slow" />
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse-slow-delay" />
                </div>
                {/* Floating 3D Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-orange-400/10 rounded-xl transform rotate-12 animate-float blur-xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-orange-400/10 rounded-full transform -rotate-12 animate-float-delay blur-xl" />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-20 px-4">
            <StatCard number="100%" label="Autonomous Operations" />
            <StatCard number="10x" label="Marketing ROI" />
            <StatCard number="24/7" label="Campaign Optimization" />
            <StatCard number="0" label="Manual Tasks Required" />
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-4 mb-20">
            <FeatureCard
              icon={<Brain className="h-8 w-8 stroke-[1.5] text-orange-600 group-hover:scale-125 transition-all duration-500 ease-out" />}
              title="Autonomous Content Creation"
              description="AI automatically generates high-converting ad copy, social media posts, and email campaigns tailored to your brand."
            />
            <FeatureCard
              icon={<BarChart2 className="h-8 w-8 stroke-[1.5] text-orange-600 group-hover:scale-125 group-hover:rotate-3 transition-transform duration-300" />}
              title="Smart Budget Optimization"
              description="AI continuously optimizes your marketing budget across channels, maximizing ROI in real-time."
            />
            <FeatureCard
              icon={<Briefcase className="h-8 w-8 stroke-[1.5] text-orange-600 group-hover:scale-110 transition-transform duration-300" />}
              title="Multi-Channel Management"
              description="Seamlessly manage and optimize campaigns across social media, email, PPC, and content marketing."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 stroke-[1.5] text-orange-600 group-hover:scale-110 transition-transform duration-300" />}
              title="Brand Protection"
              description="AI ensures all content aligns with your brand voice, guidelines, and compliance requirements."
            />
          </div>


          {/* Featured In Section */}
          <div className="flex flex-wrap justify-center items-center gap-12 mb-20 opacity-60 hover:opacity-100 transition-opacity duration-500">
            <div className="text-2xl font-black tracking-tight text-gray-400">Featured In</div>
            <div className="w-32 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
            <div className="w-32 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
            <div className="w-32 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
            <div className="w-32 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
          </div>

          {/* Integration Partners */}
          <div className="py-16 relative overflow-hidden">
            <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent animate-gradient text-center mb-20 drop-shadow-md">Trusted By Industry Leaders</h2>
            <div className="flex flex-wrap justify-center items-center gap-12 max-w-6xl mx-auto">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="group relative w-40 h-20 bg-gradient-to-br from-white/50 to-blue-50/50 backdrop-blur-md rounded-xl p-4 flex items-center justify-center hover:-translate-y-1 transition-all duration-500 border border-blue-100/50 hover:border-blue-200/70 hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.1] via-violet-500/[0.1] to-fuchsia-500/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* How it Works Section */}
          <div className="py-12 md:py-24 my-8 md:my-16 relative overflow-hidden">
            <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent text-center mb-16 drop-shadow-sm drop-shadow-sm bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent animate-gradient">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="group relative bg-gradient-to-br from-white/95 to-blue-50/95 border-2 border-white/50 shadow-lg hover:shadow-2xl backdrop-blur-md rounded-2xl p-8 text-center hover:-translate-y-3 hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/[0.25] via-orange-300/[0.2] to-orange-200/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-fuchsia-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative group/icon"><Target className="h-8 w-8 text-indigo-600 group-hover/icon:scale-110 transition-transform duration-300 stroke-[1.5]" /><span className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 rounded-full text-white text-sm font-bold flex items-center justify-center">1</span></div>
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">Connect Your Channels</h3>
                <p className="text-gray-600">Integrate all your marketing channels in one central dashboard</p>
              </div>
              <div className="group relative bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-xl rounded-2xl p-8 text-center hover:translate3d(0, -8px, 0) transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-purple-500/[0.03] to-pink-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 via-orange-400/10 to-orange-300/10 rounded-full flex items-center justify-center mx-auto mb-6 relative group/icon"><Sparkles className="h-8 w-8 text-indigo-600 group-hover/icon:scale-110 transition-transform duration-300 stroke-[1.5]" /><span className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 rounded-full text-white text-sm font-bold flex items-center justify-center">2</span></div>
                <h3 className="text-xl font-bold mb-4">AI Learns Your Brand</h3>
                <p className="text-gray-600">Our AI analyzes your brand voice and marketing strategy</p>
              </div>
              <div className="group relative bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-md rounded-2xl p-8 text-center hover:-translate-y-2 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-violet-500/[0.03] to-fuchsia-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 via-orange-400/10 to-orange-300/10 rounded-full flex items-center justify-center mx-auto mb-6 relative group/icon"><Gauge className="h-8 w-8 text-indigo-600 group-hover/icon:scale-110 transition-transform duration-300 stroke-[1.5]" /><span className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 rounded-full text-white text-sm font-bold flex items-center justify-center">3</span></div>
                <h3 className="text-xl font-bold mb-4">Autonomous Marketing</h3>
                <p className="text-gray-600">Sit back as AI manages your entire marketing operation</p>
              </div>
            </div>
          </div>



          {/* Latest Updates */}
          <div className="py-20">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 text-center mb-16">Latest Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: 'New AI Model Release',
                  description: 'Our latest AI model brings unprecedented accuracy in brand voice replication.',
                  date: 'March 15, 2024',
                  tag: 'Product Update'
                },
                {
                  title: 'Marketing Automation 2.0',
                  description: 'Introducing advanced workflow automation with predictive analytics.',
                  date: 'March 10, 2024',
                  tag: 'Feature Release'
                },
                {
                  title: 'Enterprise Success Story',
                  description: 'How Fortune 500 company achieved 300% ROI with our platform.',
                  date: 'March 5, 2024',
                  tag: 'Case Study'
                }
              ].map((post, i) => (
                <div key={i} className="group relative bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-md rounded-2xl p-8 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] via-purple-500/[0.03] to-pink-500/[0.02] animate-gradient-flow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-indigo-600 mb-4">{post.tag}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <button className="group/btn flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Read More
                      <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 group-hover:scale-110 transition-all duration-300 stroke-[1.5]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] to-purple-500/[0.05] rounded-3xl" />
            <div className="relative max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-6 drop-shadow-sm">Ready to Transform Your Marketing?</h2>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">Join innovative businesses achieving unprecedented growth with our AI-powered platform.</p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg p-2 mr-4">
                      <Clock className="h-6 w-6 text-indigo-600 group-hover:scale-110 transition-transform duration-300 stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Setup in Minutes</h3>
                      <p className="text-gray-600">Quick onboarding process with AI-guided setup</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg p-2 mr-4">
                      <Star className="h-6 w-6 text-indigo-600 group-hover:scale-110 transition-transform duration-300 stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">30-Day Trial</h3>
                      <p className="text-gray-600">Full access to all features, no credit card required</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg p-2 mr-4">
                      <Zap className="h-6 w-6 text-indigo-600 group-hover:scale-110 transition-transform duration-300 stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Instant Results</h3>
                      <p className="text-gray-600">See improvements in your first week</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] to-purple-500/[0.05] rounded-3xl transform rotate-6" />
                <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-blue-100/40">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-6 drop-shadow-sm">Start Your Free Trial</h3>
                  <div className="space-y-4">
                    <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200" />
                    <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200" />
                    <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200" />
                    <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-md hover:shadow-xl transition-all duration-200 hover:from-orange-500 hover:to-orange-400 active:scale-[0.98] group relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      Start Free Trial
                    </button>
                    <p className="text-sm text-gray-600 text-center">No credit card required</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="py-20">
            <h2 className="text-4xl font-black tracking-tight text-gray-900 text-center mb-16">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4 md:space-y-6 px-4">
              <div className="group relative bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-md rounded-xl p-6 hover:-translate-y-1 transition-all duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.08] via-purple-500/[0.07] to-pink-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-lg font-extrabold mb-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">How does the AI learn our brand voice?</h3>
                <p className="text-gray-600">Our AI analyzes your existing content, marketing materials, and brand guidelines to understand and replicate your unique voice and style consistently across all channels.</p>
              </div>
              <div className="group relative bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-md rounded-xl p-6 hover:-translate-y-1 transition-all duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-purple-500/[0.05] to-pink-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm" />
                <h3 className="text-lg font-bold mb-2">What marketing channels do you support?</h3>
                <p className="text-gray-600">We support all major marketing channels including social media, email, content marketing, PPC, and more. Our AI seamlessly integrates with your existing tools and platforms.</p>
              </div>
              <div className="group relative bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-md rounded-xl p-6 hover:-translate-y-1 transition-all duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-purple-500/[0.02] to-pink-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-lg font-bold mb-2">How quickly can we see results?</h3>
                <p className="text-gray-600">Most clients see significant improvements in engagement and ROI within the first month. The AI continuously learns and optimizes, leading to better results over time.</p>
              </div>
              <div className="group relative bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-md rounded-xl p-6 hover:-translate-y-1 transition-all duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-purple-500/[0.02] to-pink-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-lg font-bold mb-2">Is there a minimum contract period?</h3>
                <p className="text-gray-600">No, all our plans are month-to-month with no long-term commitments. You can upgrade, downgrade, or cancel at any time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 bg-gradient-to-br from-orange-500/[0.03] to-orange-400/[0.03] backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-purple-500/[0.02] to-pink-500/[0.02]" />
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-black tracking-tight text-gray-900 mb-6">
            Ready for Your AI Marketing Revolution?
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl font-semibold tracking-wide leading-relaxed mx-auto mb-8 leading-relaxed">
            Join innovative businesses achieving unprecedented growth with fully autonomous, AI-driven marketing operations.
          </p>
          <button
            onClick={() => navigate('/GetStarted')}
            className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(234,88,12,0.6)] hover:shadow-[0_0_35px_rgba(234,88,12,0.9)] transition-all duration-500 hover:from-orange-500 hover:to-orange-400 active:scale-95 flex items-center space-x-2 mx-auto hover:-translate-y-2 overflow-hidden isolate hover:scale-110 hover:[transform:perspective(1000px)_rotateX(10deg)] animate-glow">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur -z-10" />
              <span>Launch Your AI Marketing Team</span>
            <ArrowRight className="h-5 w-5 group-hover:translate3d(4px, 0, 0) transition-transform duration-200" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-white/90 backdrop-blur-xl border-t-2 border-white/50 border-t border-blue-100/50 py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-purple-500/[0.02] to-pink-500/[0.02]" />
        <div className="max-w-7xl mx-auto px-8 text-center text-gray-600 text-sm">
          © 2024 LVLHUB. All rights reserved.
        </div>
      </footer>

      {/* Floating Chat Widget */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out ${showChat ? 'translate-y-0' : 'translate-y-4'}`}>
        {showChat ? (
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 w-80 transform transition-all duration-300 hover:scale-105 border border-gray-100 hover:border-orange-200/50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">Chat with us</h3>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-600 text-sm">Hi! How can we help you today?</p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-200 bg-white/80"
              />
              <button
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-xl hover:from-orange-600 hover:to-orange-500 transition-all duration-200 flex items-center gap-2 group">
                <span>Send</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowChat(true)}
            className="bg-orange-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-orange-600 group"
            aria-label="Open chat"
          >
            <MessageCircle className="h-6 w-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ease-out animate-gentle-bounce" />
          </button>
        )}
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StatCardProps {
  number: string;
  label: string;
}

function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-2xl rounded-xl px-8 py-6 min-w-[200px] text-center border border-blue-100/40 hover:border-blue-200/60 transition-all duration-500 hover:shadow-[0_24px_48px_rgb(234,88,12,0.25),_0_8px_16px_rgba(234,88,12,0.2)] hover:shadow-orange-500/30 hover:[transform:perspective(2000px)_rotateX(15deg)_rotateY(-10deg)_translateZ(40px)_scale(1.05)] hover:bg-gradient-to-br hover:from-white hover:to-blue-100/90 overflow-hidden hover:-translate-y-2 animate-glow">
      {/* 3D Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-purple-500/[0.02] to-pink-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/10 via-orange-400/10 to-orange-300/10 rounded-[22px] blur opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
      <div className="absolute -inset-2 bg-gradient-to-br from-orange-500/15 to-orange-400/10 rounded-[24px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-20 group-hover:scale-110" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="text-5xl font-black bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300 animate-gradient drop-shadow-sm group-hover:[transform:translateZ(20px)]">{number}</div>
        <div className="text-gray-600 font-medium tracking-wide text-lg group-hover:[transform:translateZ(10px)] transition-transform duration-300">{label}</div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl transform rotate-12 animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full transform -rotate-12 animate-float-delay opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    </div>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-lg border border-blue-100/40 hover:shadow-[0_24px_48px_rgb(234,88,12,0.2),_0_12px_24px_rgba(234,88,12,0.15),_0_8px_16px_rgba(234,88,12,0.1)] transition-all duration-500 hover:border-blue-200/60 hover:bg-gradient-to-br hover:from-white hover:to-blue-100/90 overflow-hidden hover:-translate-y-4 hover:[transform:perspective(2000px)_rotateX(10deg)_rotateY(-15deg)_translateZ(40px)_scale(1.05)] animate-glow transform opacity-100 translate-y-0">
      {/* 3D Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.08] via-purple-500/[0.06] to-pink-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm" />
      <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/20 via-orange-400/15 to-orange-300/10 rounded-[22px] blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500 -z-10" />
      <div className="absolute -inset-2 bg-gradient-to-br from-orange-500/5 to-orange-400/5 rounded-[24px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-20 group-hover:scale-110" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="relative bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-xl p-4 w-fit mb-6 group-hover:[transform:perspective(1000px)_rotateX(20deg)_rotateY(-10deg)_translateZ(20px)] transition-transform duration-500 overflow-hidden">
          {/* Icon Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Icon */}
          <div className="relative transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:[transform:translateZ(30px)] transition-transform duration-300">{title}</h3>
        <p className="text-gray-600 leading-relaxed group-hover:[transform:translateZ(20px)] transition-transform duration-300">{description}</p>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/15 rounded-xl transform rotate-12 animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/15 rounded-full transform -rotate-12 animate-float-delay opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
    </div>
  );
}
