import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useProgress } from '../contexts/ProgressProvider';
import { getCourseWithContent, CONTENT_TYPES, getCourseProgress } from '../data/courses/index';
import { BookOpen, Code, HelpCircle, Rocket, FileText, ChevronRight, CheckCircle2, Circle, Lock, Clock, ArrowLeft } from 'lucide-react';
import clsx from 'clsx';

const ITEM_ICONS = {
    [CONTENT_TYPES.LESSON]: <Code size={18} />,
    [CONTENT_TYPES.QUIZ]: <HelpCircle size={18} />,
    [CONTENT_TYPES.PROJECT]: <Rocket size={18} />,
    [CONTENT_TYPES.INFORMATIONAL]: <FileText size={18} />
};

const ITEM_COLORS = {
    [CONTENT_TYPES.LESSON]: 'bg-blue-500',
    [CONTENT_TYPES.QUIZ]: 'bg-purple-500',
    [CONTENT_TYPES.PROJECT]: 'bg-orange-500',
    [CONTENT_TYPES.INFORMATIONAL]: 'bg-green-500'
};

export default function CourseSyllabus() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [expandedUnits, setExpandedUnits] = useState({});
    const { completedItems } = useProgress();

    useEffect(() => {
        const courseData = getCourseWithContent(courseId);
        if (courseData) {
            setCourse(courseData);
            // Expand first unit by default
            if (courseData.units?.length > 0) {
                setExpandedUnits({ [courseData.units[0].id]: true });
            }
        } else {
            navigate('/dashboard');
        }
    }, [courseId, navigate]);

    if (!course) {
        return (
            <div className="h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    const progress = getCourseProgress(courseId, completedItems);

    const toggleUnit = (unitId) => {
        setExpandedUnits(prev => ({ ...prev, [unitId]: !prev[unitId] }));
    };

    const handleItemClick = (item) => {
        navigate(`/learn/${courseId}/${item.id}`);
    };

    return (
        <div className="h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex flex-col overflow-hidden">
            <Header progress={progress.percentage} />

            <main className="flex-1 overflow-y-auto min-h-0">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Dashboard</span>
                    </button>

                    {/* Course Header */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-presuniv-maroon">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-presuniv-maroon text-sm font-bold uppercase tracking-wider mb-2">
                                    <BookOpen size={16} />
                                    <span>Course</span>
                                </div>
                                <h1 className="text-3xl font-bold text-slate-900 mb-2">{course.title}</h1>
                                <p className="text-gray-600 mb-4">{course.description}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Clock size={14} />
                                        {course.duration}
                                    </span>
                                    <span>{course.units?.length || 0} Units</span>
                                    <span>{progress.total} Items</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-bold text-presuniv-maroon">{progress.percentage}%</div>
                                <div className="text-sm text-gray-500">Complete</div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-6">
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-presuniv-maroon to-red-500 transition-all duration-500"
                                    style={{ width: `${progress.percentage}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Syllabus */}
                    <div className="space-y-4">
                        {course.units?.map((unit, unitIndex) => {
                            const isExpanded = expandedUnits[unit.id];
                            const unitCompleted = unit.items.filter(i => completedItems.includes(i.id)).length;
                            const unitProgress = Math.round((unitCompleted / unit.items.length) * 100);

                            return (
                                <div key={unit.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                    {/* Unit Header */}
                                    <button
                                        onClick={() => toggleUnit(unit.id)}
                                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={clsx(
                                                "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold",
                                                unitProgress === 100 ? "bg-green-500" : "bg-presuniv-navy"
                                            )}>
                                                {unitProgress === 100 ? <CheckCircle2 size={20} /> : unitIndex + 1}
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-bold text-slate-900">{unit.title}</h3>
                                                <p className="text-sm text-gray-500">{unit.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="text-sm font-semibold text-gray-700">{unitCompleted}/{unit.items.length}</div>
                                                <div className="text-xs text-gray-400">completed</div>
                                            </div>
                                            <ChevronRight
                                                size={20}
                                                className={clsx(
                                                    "text-gray-400 transition-transform",
                                                    isExpanded && "rotate-90"
                                                )}
                                            />
                                        </div>
                                    </button>

                                    {/* Unit Items */}
                                    {isExpanded && (
                                        <div className="border-t border-gray-100">
                                            {unit.items.map((item, itemIndex) => {
                                                const isCompleted = completedItems.includes(item.id);
                                                const isLocked = false; // TODO: Implement prerequisite logic

                                                return (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => !isLocked && handleItemClick(item)}
                                                        disabled={isLocked}
                                                        className={clsx(
                                                            "w-full px-6 py-4 flex items-center gap-4 border-b border-gray-50 last:border-b-0 transition-colors",
                                                            isLocked ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-50 cursor-pointer"
                                                        )}
                                                    >
                                                        {/* Status Icon */}
                                                        <div className={clsx(
                                                            "w-8 h-8 rounded-full flex items-center justify-center",
                                                            isCompleted ? "bg-green-100 text-green-600" :
                                                            isLocked ? "bg-gray-100 text-gray-400" :
                                                            "bg-gray-100 text-gray-500"
                                                        )}>
                                                            {isCompleted ? <CheckCircle2 size={16} /> :
                                                             isLocked ? <Lock size={14} /> :
                                                             <Circle size={16} />}
                                                        </div>

                                                        {/* Type Badge */}
                                                        <div className={clsx(
                                                            "w-8 h-8 rounded-lg flex items-center justify-center text-white",
                                                            ITEM_COLORS[item.type]
                                                        )}>
                                                            {ITEM_ICONS[item.type]}
                                                        </div>

                                                        {/* Content */}
                                                        <div className="flex-1 text-left">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium text-slate-900">{item.title}</span>
                                                                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize">
                                                                    {item.type}
                                                                </span>
                                                            </div>
                                                            <div className="text-sm text-gray-500">{item.duration}</div>
                                                        </div>

                                                        {/* Arrow */}
                                                        {!isLocked && (
                                                            <ChevronRight size={18} className="text-gray-400" />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
