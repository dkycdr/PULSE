import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useProgress } from '../contexts/ProgressProvider';
import { useAuth } from '../contexts/AuthProvider';
import { courses, LEVELS, getCoursesByLevel, checkPrerequisites, getOverallProgress } from '../data/curriculumStructure';
import { Code, Palette, Terminal, Database, ArrowRight, Lock, CheckCircle2, Circle, Clock, Award } from 'lucide-react';
import clsx from 'clsx';

// Icon mapping
const COURSE_ICONS = {
    html5: <Code size={24} className="text-orange-500" />,
    css3: <Palette size={24} className="text-blue-500" />,
    git: <Terminal size={24} className="text-gray-700" />,
    tailwind: <Palette size={24} className="text-cyan-500" />,
    'js-basics': <Terminal size={24} className="text-yellow-500" />,
    dom: <Code size={24} className="text-purple-500" />,
    'js-es6': <Terminal size={24} className="text-yellow-600" />,
    php: <Code size={24} className="text-indigo-600" />,
    mysql: <Database size={24} className="text-blue-700" />,
    python: <Terminal size={24} className="text-blue-600" />,
    react: <Code size={24} className="text-cyan-600" />,
    typescript: <Code size={24} className="text-blue-700" />,
    node: <Terminal size={24} className="text-green-600" />,
    mongodb: <Database size={24} className="text-green-700" />,
    nextjs: <Code size={24} className="text-black" />,
    cicd: <Terminal size={24} className="text-gray-600" />
};

export default function Dashboard() {
    const navigate = useNavigate();
    const [selectedLevel, setSelectedLevel] = useState('all');
    const { completedCourses, loading } = useProgress();
    const { user } = useAuth();

    const progress = getOverallProgress(completedCourses);

    if (loading) {
        return (
            <div className="h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading your progress...</div>
            </div>
        );
    }

    const renderCourseCard = (courseData) => {
        const { id, title, level, duration, prerequisites, shortDesc, order } = courseData;
        const isCompleted = completedCourses.includes(id);
        const isLocked = !checkPrerequisites(id, completedCourses, user?.email);
        const canAccess = !isLocked || isCompleted;

        return (
            <div
                key={id}
                onClick={() => canAccess && navigate(`/course/${id}`)}
                className={clsx(
                    "group relative bg-white rounded-2xl shadow-sm border-2 overflow-hidden transition-all duration-300",
                    canAccess ? "hover:shadow-2xl cursor-pointer hover:-translate-y-2 border-gray-200 hover:border-presuniv-maroon" : "opacity-50 cursor-not-allowed border-gray-100"
                )}
            >
                {/* Top Accent Bar */}
                <div className={clsx("h-1.5 bg-gradient-to-r", LEVELS[level.toUpperCase()].color)} />

                <div className="p-6">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-4">
                        {/* Icon */}
                        <div className={clsx(
                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                            LEVELS[level.toUpperCase()].bgColor,
                            canAccess && "group-hover:scale-110"
                        )}>
                            {COURSE_ICONS[id] || <Code size={24} />}
                        </div>

                        {/* Status Badge */}
                        {isCompleted ? (
                            <div className="flex items-center space-x-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
                                <CheckCircle2 size={16} strokeWidth={2.5} />
                                <span className="text-xs font-bold">Completed</span>
                            </div>
                        ) : isLocked ? (
                            <div className="flex items-center space-x-1.5 bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full">
                                <Lock size={14} />
                                <span className="text-xs font-medium">Locked</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full">
                                <Circle size={14} strokeWidth={2} />
                                <span className="text-xs font-medium">Start</span>
                            </div>
                        )}
                    </div>

                    {/* Title & Order */}
                    <div className="mb-3">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-bold text-gray-400">#{order}</span>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{level}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 leading-tight">{title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{shortDesc}</p>

                    {/* Footer Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-1.5 text-gray-500">
                            <Clock size={14} />
                            <span className="text-xs font-medium">{duration}</span>
                        </div>
                        {canAccess && (
                            <div className="flex items-center space-x-1 text-presuniv-navy font-semibold text-sm group-hover:text-presuniv-maroon transition-colors">
                                <span>{isCompleted ? 'Review' : 'Start'}</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const filteredLevels = selectedLevel === 'all'
        ? Object.values(LEVELS)
        : [LEVELS[selectedLevel.toUpperCase()]];

    return (
        <div className="h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 flex flex-col overflow-hidden">
            <Header progress={progress.percentage} />

            <main className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">

                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-presuniv-maroon to-red-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-lg">
                            <Award size={14} />
                            <span>Full-Stack Career Path</span>
                        </div>
                        <h1 className="text-6xl font-black text-slate-900 mb-4 tracking-tight">
                            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-presuniv-maroon via-red-600 to-orange-500">PULSE</span> Journey
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
                            16 modules. 3 levels. Infinite possibilities.
                        </p>

                        {/* Progress Card */}
                        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
                                <span className="text-2xl font-black text-presuniv-maroon">{progress.percentage}%</span>
                            </div>
                            <div className="h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner mb-2">
                                <div
                                    className="h-full bg-gradient-to-r from-presuniv-maroon via-red-600 to-orange-500 transition-all duration-1000 ease-out shadow-lg"
                                    style={{ width: `${progress.percentage}%` }}
                                />
                            </div>
                            <p className="text-xs text-gray-500 font-medium">
                                {progress.completed} of {progress.total} modules completed
                            </p>
                        </div>
                    </div>

                    {/* Level Filter */}
                    <div className="flex justify-center space-x-3 mb-10">
                        <button
                            onClick={() => setSelectedLevel('all')}
                            className={clsx(
                                "px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300",
                                selectedLevel === 'all'
                                    ? "bg-slate-900 text-white shadow-lg scale-105"
                                    : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200"
                            )}
                        >
                            All Levels
                        </button>
                        {Object.values(LEVELS).map(level => (
                            <button
                                key={level.id}
                                onClick={() => setSelectedLevel(level.id)}
                                className={clsx(
                                    "px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center space-x-2",
                                    selectedLevel === level.id
                                        ? `bg-gradient-to-r ${level.color} text-white shadow-lg scale-105`
                                        : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200"
                                )}
                            >
                                <span>{level.icon}</span>
                                <span>{level.label.en}</span>
                            </button>
                        ))}
                    </div>

                    {/* Level Sections */}
                    {filteredLevels.map((level, idx) => {
                        const levelCourses = getCoursesByLevel(level.id);
                        const levelCompleted = levelCourses.filter(c => completedCourses.includes(c.id)).length;
                        const levelProgress = Math.round((levelCompleted / levelCourses.length) * 100);

                        return (
                            <div key={level.id} className="mb-16">
                                {/* Level Header */}
                                <div className={clsx(
                                    "bg-gradient-to-r p-8 rounded-3xl shadow-2xl mb-8 border-2",
                                    level.color,
                                    level.borderColor
                                )}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-5xl">{level.icon}</span>
                                            <div>
                                                <div className="text-white/80 text-sm font-semibold mb-1">LEVEL {idx + 1}</div>
                                                <h2 className="text-4xl font-black text-white tracking-tight">
                                                    {level.label.en.toUpperCase()}
                                                </h2>
                                                <p className="text-white/90 text-base font-light mt-1">{level.tagline.id}</p>
                                            </div>
                                        </div>
                                        <div className="text-right bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                                            <div className="text-white/80 text-xs font-semibold mb-1">PROGRESS</div>
                                            <div className="text-4xl font-black text-white">{levelProgress}%</div>
                                            <div className="text-white/70 text-xs mt-1">{levelCompleted}/{levelCourses.length} Done</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Course Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {levelCourses.map(course => renderCourseCard(course))}
                                </div>
                            </div>
                        );
                    })}

                </div>
            </main>
        </div>
    );
}
