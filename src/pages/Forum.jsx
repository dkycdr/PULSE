import React, { useState } from 'react';
import Header from '../components/Header';
import { MessageSquare, ThumbsUp, MessageCircle, Clock, TrendingUp, Search } from 'lucide-react';

const MOCK_THREADS = [
    {
        id: 1,
        title: 'How to center a div in CSS?',
        author: 'Sarah Chen',
        category: 'CSS',
        replies: 12,
        likes: 24,
        timeAgo: '2 hours ago',
        excerpt: 'I\'ve tried using margin: auto but it\'s not working...'
    },
    {
        id: 2,
        title: 'Best practices for React state management',
        author: 'Ahmad Rizki',
        category: 'React',
        replies: 8,
        likes: 31,
        timeAgo: '5 hours ago',
        excerpt: 'Should I use Context API or Redux for a medium-sized app?'
    },
    {
        id: 3,
        title: 'MySQL vs MongoDB: When to use which?',
        author: 'Jessica Tan',
        category: 'Database',
        replies: 15,
        likes: 42,
        timeAgo: '1 day ago',
        excerpt: 'I\'m building an e-commerce platform and confused about database choice...'
    },
    {
        id: 4,
        title: 'Tailwind CSS tips for beginners',
        author: 'Budi Santoso',
        category: 'Tailwind',
        replies: 6,
        likes: 18,
        timeAgo: '2 days ago',
        excerpt: 'Share your favorite Tailwind utilities and patterns!'
    },
];

export default function Forum() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', 'HTML', 'CSS', 'JavaScript', 'React', 'Backend', 'Database'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex flex-col">
            <Header />

            <main className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                            <MessageSquare size={14} />
                            <span>Community</span>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 mb-4">
                            PULSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Forum</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-6">
                            Connect, ask questions, and learn together
                        </p>
                        <button className="bg-gradient-to-r from-presuniv-maroon to-red-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            + New Discussion
                        </button>
                    </div>

                    {/* Search & Filter */}
                    <div className="mb-8">
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search discussions..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-presuniv-navy focus:outline-none text-gray-700 font-medium"
                            />
                        </div>

                        {/* Category Pills */}
                        <div className="flex flex-wrap gap-3">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${selectedCategory === cat
                                            ? 'bg-presuniv-navy text-white shadow-lg scale-105'
                                            : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200'
                                        }`}
                                >
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Thread List */}
                    <div className="space-y-4">
                        {MOCK_THREADS.map(thread => (
                            <div
                                key={thread.id}
                                className="group bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:border-presuniv-navy hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                                                {thread.category}
                                            </span>
                                            <div className="flex items-center space-x-1 text-gray-500 text-xs">
                                                <Clock size={12} />
                                                <span>{thread.timeAgo}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-presuniv-navy transition-colors mb-2">
                                            {thread.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3">{thread.excerpt}</p>
                                        <div className="flex items-center space-x-1 text-gray-500 text-sm">
                                            <span className="font-medium">by</span>
                                            <span className="font-bold text-gray-700">{thread.author}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <MessageCircle size={16} />
                                        <span className="text-sm font-semibold">{thread.replies} replies</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <ThumbsUp size={16} />
                                        <span className="text-sm font-semibold">{thread.likes} likes</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Coming Soon Notice */}
                    <div className="mt-12 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
                        <TrendingUp size={48} className="mx-auto text-purple-600 mb-4" />
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Forum Coming Soon!</h3>
                        <p className="text-gray-600">
                            We're building an amazing community space. Stay tuned!
                        </p>
                    </div>

                </div>
            </main>
        </div>
    );
}
