
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      containerRef.current.style.setProperty('--x', `${x}`);
      containerRef.current.style.setProperty('--y', `${y}`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ '--x': '0.5', '--y': '0.5' } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/80 to-white/30 dark:from-green-950/20 dark:to-black/5"></div>
      
      {/* Animated background elements */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-green-200 dark:bg-green-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-sky-200 dark:bg-sky-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-earth-200 dark:bg-earth-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6 animate-fade-up">
            <div className="inline-block bg-green-100 dark:bg-green-900/30 rounded-full px-3 py-1 text-sm font-medium text-green-800 dark:text-green-300 mb-2">
              Smart Agriculture Platform
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Grow Smarter, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">
                Harvest Better
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              AgriAssist brings cutting-edge technology to your fields. Optimize your farm with 
              AI-powered recommendations, real-time monitoring, and data-driven insights.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="group">
                Get Started 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                Explore Features
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-green-600/20 to-sky-400/20 blur-xl"></div>
              <div className="glass-card p-1 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d73c5207fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Smart Farming"
                  className="w-full h-auto rounded-xl transform transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="glass-card p-4 rounded-lg text-center">
                <div className="font-bold text-2xl text-green-600 dark:text-green-400">85%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Yield Increase</div>
              </div>
              <div className="glass-card p-4 rounded-lg text-center">
                <div className="font-bold text-2xl text-green-600 dark:text-green-400">40%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Cost Reduction</div>
              </div>
              <div className="glass-card p-4 rounded-lg text-center">
                <div className="font-bold text-2xl text-green-600 dark:text-green-400">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
