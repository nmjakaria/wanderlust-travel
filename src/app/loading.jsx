import React from 'react';
import { LuPlane } from 'react-icons/lu';

const Loading = () => {
    return (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
            <div className="relative flex flex-col items-center">
                {/* 1. Animated Plane/Travel Icon */}
                <div className="relative w-24 h-24 mb-6">
                    {/* Outer Rotating Ring */}
                    <div className="absolute inset-0 border-4 border-t-cyan-500 border-r-transparent border-b-cyan-200 border-l-transparent rounded-full animate-spin"></div>

                    {/* Inner Plane Icon with Bounce Effect */}
                    <div className="absolute inset-0 flex items-center justify-center animate-bounce">
                        <LuPlane size={40} />
                    </div>
                </div>

                {/* 2. Text Content */}
                <h2 className="text-3xl font-black text-gray-800 tracking-tight flex items-center gap-1">
                    Wander<span className="text-cyan-600">lust</span>
                </h2>
                
                <div className="mt-3 flex flex-col items-center gap-2">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.3em] pl-[0.3em]">
                        Preparing your journey
                    </p>
                    <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>

            {/* 3. Progress Bar Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-100/50 overflow-hidden">
                <div 
                    className="h-full bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-600 w-1/3"
                    style={{
                        animation: 'loadingProgress 2s infinite ease-in-out'
                    }}
                ></div>
            </div>

            {/* Inline CSS Fix */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes loadingProgress {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(300%); }
                }
            `}} />
        </div>
    );
};

export default Loading;