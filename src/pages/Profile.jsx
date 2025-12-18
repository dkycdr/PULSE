import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthProvider';
import { useProgress } from '../contexts/ProgressProvider';
import { getCourseProgress } from '../data/courses/index';
import { courseCatalog } from '../data/courseCatalog';
import Header from '../components/Header';
import { User, Mail, GraduationCap, Hash, BookOpen, Trophy, Award, TrendingUp, Edit2, LogOut, Save, X, Calendar } from 'lucide-react';

export default function Profile() {
    const { user, logout, updateUser } = useAuth();
    const { completedCourses, completedItems } = useProgress();
    const navigate = useNavigate();
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        major: user?.major || '',
        studentId: user?.studentId || ''
    });

    const majors = [
        'Software Engineering',
        'Information Technology',
        'Computer Science',
        'Information Systems',
        'Data Science'
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSave = () => {
        updateUser(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            major: user?.major || '',
            studentId: user?.studentId || ''
        });
        setIsEditing(false);
    };

    // Calculate stats
    const totalCourses = courseCatalog.length;
    const completedCoursesCount = completedCourses.length;
    const totalItems = completedItems.length;
    const completionRate = totalCourses > 0 ? Math.round((completedCoursesCount / totalCourses) * 100) : 0;

    // Get courses in progress
    const coursesInProgress = courseCatalog.filter(course => {
        const progress = getCourseProgress(course.id, completedItems);
        return progress.percentage > 0 && progress.percentage < 100;
    });

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Profile Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-200"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-presuniv-navy to-presuniv-maroon flex items-center justify-center text-white text-2xl font-bold">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            
                            {/* User Info */}
                            <div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="text-2xl font-bold text-slate-900 border-b-2 border-blue-500 focus:outline-none bg-transparent mb-1"
                                    />
                                ) : (
                                    <h1 className="text-2xl font-bold text-slate-900">{user?.name || 'Student'}</h1>
                                )}
                                {isEditing ? (
                                    <select
                                        value={formData.major}
                                        onChange={(e) => setFormData({...formData, major: e.target.value})}
                                        className="text-sm text-slate-600 border-b border-blue-500 focus:outline-none bg-transparent"
                                    >
                                        {majors.map(major => (
                                            <option key={major} value={major}>{major}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-sm text-slate-600">{user?.major || 'Software Engineering'}</p>
                                )}
                                <p className="text-xs text-slate-500 mt-1">Joined {user?.joinedDate || 'January 2024'}</p>
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <Save size={16} />
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-300 transition-colors"
                                    >
                                        <X size={16} />
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Edit2 size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Profile Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                <Mail className="text-blue-600" size={18} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-slate-500">Email</p>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full text-sm font-medium text-slate-900 border-b border-blue-500 focus:outline-none bg-transparent"
                                    />
                                ) : (
                                    <p className="text-sm font-medium text-slate-900">{user?.email || 'N/A'}</p>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                                <Hash className="text-purple-600" size={18} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-slate-500">Student ID</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.studentId}
                                        onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                                        className="w-full text-sm font-medium text-slate-900 border-b border-blue-500 focus:outline-none bg-transparent"
                                    />
                                ) : (
                                    <p className="text-sm font-medium text-slate-900">{user?.studentId || 'N/A'}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                <BookOpen className="text-blue-600" size={20} />
                            </div>
                            <span className="text-2xl font-bold text-slate-900">{completedCoursesCount}</span>
                        </div>
                        <p className="text-xs text-slate-600">Completed</p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                                <Trophy className="text-purple-600" size={20} />
                            </div>
                            <span className="text-2xl font-bold text-slate-900">{totalItems}</span>
                        </div>
                        <p className="text-xs text-slate-600">Lessons</p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                                <TrendingUp className="text-green-600" size={20} />
                            </div>
                            <span className="text-2xl font-bold text-slate-900">{coursesInProgress.length}</span>
                        </div>
                        <p className="text-xs text-slate-600">In Progress</p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
                                <Award className="text-yellow-600" size={20} />
                            </div>
                            <span className="text-2xl font-bold text-slate-900">{completionRate}%</span>
                        </div>
                        <p className="text-xs text-slate-600">Progress</p>
                    </motion.div>
                </div>

                {/* Courses in Progress */}
                {coursesInProgress.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
                    >
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Continue Learning</h2>
                        <div className="space-y-3">
                            {coursesInProgress.map(course => {
                                const progress = getCourseProgress(course.id, completedItems);
                                return (
                                    <div 
                                        key={course.id} 
                                        className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
                                        onClick={() => navigate(`/course/${course.id}`)}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-slate-900 text-sm">{course.title}</h3>
                                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">{progress.percentage}%</span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                                            <div 
                                                className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5 rounded-full transition-all duration-300"
                                                style={{ width: `${progress.percentage}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2">{progress.completed} of {progress.total} completed</p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
