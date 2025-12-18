import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { User, LogOut, Code2, BookOpen, Users, Bell } from 'lucide-react';

export default function Header({ progress }) {
    const { user, signOut } = useAuth();

    return (
        <header className="h-16 bg-[#0a192f]/95 backdrop-blur-md text-white flex items-center justify-between px-6 border-b border-gray-800 shadow-lg relative z-30">
            {/* Logo Section */}
            <div className="flex items-center space-x-6">
                <Link to="/dashboard" className="flex items-center space-x-3 group">
                    <img
                        src="/assets/pulse_logo_horizontal_1766021930585.png"
                        alt="PULSE - President University Learning System"
                        className="h-10 object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>

                <div className="h-8 w-px bg-gray-700 mx-2 hidden lg:block"></div>

                {/* Navigation Links */}
                <nav className="hidden lg:flex items-center space-x-1 bg-white/5 rounded-full p-1 border border-white/10">
                    <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-1.5 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                        <Code2 size={16} />
                        <span>Curriculum</span>
                    </Link>
                    <Link to="/resources" className="flex items-center space-x-2 px-4 py-1.5 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                        <BookOpen size={16} />
                        <span>Library</span>
                    </Link>
                    <Link to="/community" className="flex items-center space-x-2 px-4 py-1.5 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                        <Users size={16} />
                        <span>Forum</span>
                    </Link>
                </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
                {/* Progress Stats */}
                {progress !== undefined && (
                    <div className="hidden md:flex flex-col w-40 group cursor-default">
                        <div className="flex justify-between text-xs font-medium text-gray-400 mb-1.5 px-1">
                            <span className="group-hover:text-red-400 transition-colors">Lesson Progress</span>
                            <span className="text-white font-bold">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700/50">
                            <div
                                className="h-full bg-gradient-to-r from-presuniv-maroon to-red-500 shadow-[0_0_10px_rgba(128,0,0,0.5)] transition-all duration-700 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="flex items-center space-x-4 pl-6 border-l border-gray-700">
                    <button className="text-gray-400 hover:text-white transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0a192f]"></span>
                    </button>

                    <div className="flex items-center space-x-3">
                        <Link to="/profile" className="flex items-center space-x-3 group">
                            <div className="text-right hidden xl:block">
                                <div className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">{user?.name || user?.email?.split('@')[0] || 'Student'}</div>
                                <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{user?.major || 'Student'}</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-600 group-hover:border-red-500 flex items-center justify-center transition-all shadow-lg overflow-hidden">
                                <User size={20} className="text-gray-300" />
                            </div>
                        </Link>

                        <button
                            onClick={() => signOut()}
                            className="p-2.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                            title="Sign Out"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
