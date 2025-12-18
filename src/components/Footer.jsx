import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle2, Terminal, Menu, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export default function Footer({ onRun, onCheck, isRunning, isChecking, toggleConsole, isConsoleOpen, onNext }) {
    const navigate = useNavigate();

    return (
        <footer className="h-14 bg-white border-t border-gray-200 flex items-center justify-between px-4 sticky bottom-0 z-20">
            <div className="flex items-center">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center space-x-2 text-gray-500 hover:text-[#10162f] px-3 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                    <Menu size={18} />
                    <span className="hidden sm:inline">Menu</span>
                </button>
            </div>

            <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
                <button
                    onClick={toggleConsole}
                    className={clsx(
                        "flex items-center space-x-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all border",
                        isConsoleOpen
                            ? "bg-gray-100 text-gray-900 border-gray-300"
                            : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
                    )}
                >
                    <Terminal size={14} />
                    <span>Console</span>
                    <div className={clsx("w-2 h-2 rounded-full", isConsoleOpen ? "bg-green-500" : "bg-gray-300")}></div>
                </button>
            </div>

            <div className="flex items-center space-x-3">
                <button
                    onClick={onRun}
                    disabled={isRunning}
                    className="flex items-center space-x-2 px-5 py-2 bg-[#10162f] text-white rounded hover:bg-[#1e2a5a] active:scale-95 transition-all text-sm font-semibold shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <Play size={16} className={isRunning ? "animate-spin" : "fill-current"} />
                    <span>Run</span>
                </button>

                <button
                    onClick={onCheck}
                    disabled={isChecking}
                    className="flex items-center space-x-2 px-5 py-2 bg-[#ffd300] text-black rounded hover:bg-[#ffe033] active:scale-95 transition-all text-sm font-bold shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isChecking ? (
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <CheckCircle2 size={16} />
                    )}
                    <span>Check</span>
                </button>

                {onNext && (
                    <button
                        onClick={onNext}
                        className="flex items-center space-x-2 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 active:scale-95 transition-all text-sm font-bold shadow-sm"
                    >
                        <span>Next</span>
                        <ArrowRight size={16} />
                    </button>
                )}
            </div>
        </footer>
    );
}
