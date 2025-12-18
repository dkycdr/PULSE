import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Book, FileText, Video, Code2, ExternalLink, Search } from 'lucide-react';

const RESOURCES = [
    {
        category: 'Documentation',
        icon: <FileText size={24} className="text-blue-600" />,
        items: [
            { title: 'MDN Web Docs', desc: 'Comprehensive web development reference', url: 'https://developer.mozilla.org' },
            { title: 'React Documentation', desc: 'Official React.js guide', url: 'https://react.dev' },
            { title: 'Tailwind CSS Docs', desc: 'Utility-first CSS framework', url: 'https://tailwindcss.com' },
        ]
    },
    {
        category: 'Video Tutorials',
        icon: <Video size={24} className="text-red-600" />,
        items: [
            { title: 'Web Dev Simplified', desc: 'Modern web development tutorials', url: 'https://youtube.com/@WebDevSimplified' },
            { title: 'Traversy Media', desc: 'Full-stack development courses', url: 'https://youtube.com/@TraversyMedia' },
            { title: 'Fireship', desc: 'Quick tech explanations', url: 'https://youtube.com/@Fireship' },
        ]
    },
    {
        category: 'Practice Platforms',
        icon: <Code2 size={24} className="text-green-600" />,
        items: [
            { title: 'LeetCode', desc: 'Coding interview preparation', url: 'https://leetcode.com' },
            { title: 'Frontend Mentor', desc: 'Real-world frontend challenges', url: 'https://frontendmentor.io' },
            { title: 'Codewars', desc: 'Code kata and challenges', url: 'https://codewars.com' },
        ]
    },
    {
        category: 'Books & Guides',
        icon: <Book size={24} className="text-purple-600" />,
        items: [
            { title: 'Eloquent JavaScript', desc: 'Modern JavaScript programming', url: 'https://eloquentjavascript.net' },
            { title: 'You Don\'t Know JS', desc: 'Deep dive into JavaScript', url: 'https://github.com/getify/You-Dont-Know-JS' },
            { title: 'Clean Code', desc: 'Writing maintainable code', url: '#' },
        ]
    },
];

export default function Library() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex flex-col">
            <Header />

            <main className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                            <Book size={14} />
                            <span>Learning Resources</span>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 mb-4">
                            PULSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Library</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Curated resources to accelerate your learning journey
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search resources..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-presuniv-navy focus:outline-none text-gray-700 font-medium"
                            />
                        </div>
                    </div>

                    {/* Resource Categories */}
                    {RESOURCES.map((category, idx) => (
                        <div key={idx} className="mb-12">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                    {category.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">{category.category}</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.items.map((item, itemIdx) => (
                                    <a
                                        key={itemIdx}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:border-presuniv-navy hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-presuniv-navy transition-colors">
                                                {item.title}
                                            </h3>
                                            <ExternalLink size={16} className="text-gray-400 group-hover:text-presuniv-navy transition-colors" />
                                        </div>
                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            </main>
        </div>
    );
}
