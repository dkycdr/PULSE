import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';
import { CheckCircle2, Circle, BookOpen } from 'lucide-react';

export default function InstructionPane({ lesson }) {
    if (!lesson) return <div className="p-6 text-white">Loading...</div>;

    return (
        <div className="h-full w-full flex flex-col bg-slate-50 border-r border-gray-200">

            {/* Fixed Header */}
            <div className="flex-none p-6 border-b border-gray-200 bg-white">
                <div className="flex items-center space-x-2 text-presuniv-nav text-xs font-bold uppercase tracking-wider mb-2 text-blue-600">
                    <BookOpen size={14} />
                    <span>Module Guide</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">{lesson.title}</h2>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-6 bg-slate-50 relative min-w-0">
                <div className="w-full min-w-0">
                    <div className="prose prose-slate prose-sm max-w-none mb-8 text-slate-600 leading-relaxed break-words">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                // Custom renderer for code blocks to FORCE wrapping
                                code({ node, inline, className, children, ...props }) {
                                    return (
                                        <code
                                            className={clsx(className, "font-mono text-sm")}
                                            style={{
                                                whiteSpace: 'pre-wrap',
                                                wordBreak: 'break-word',
                                                overflowWrap: 'anywhere'
                                            }}
                                            {...props}
                                        >
                                            {children}
                                        </code>
                                    );
                                },
                                pre({ node, children, ...props }) {
                                    return (
                                        <pre
                                            className="bg-slate-800 text-slate-50 rounded-lg p-4 my-4 overflow-x-hidden"
                                            style={{
                                                whiteSpace: 'pre-wrap',
                                                wordBreak: 'break-word'
                                            }}
                                            {...props}
                                        >
                                            {children}
                                        </pre>
                                    );
                                },
                                // Table styling
                                table: ({ children }) => (
                                    <div className="overflow-x-auto my-4 rounded-lg border border-gray-200 shadow-sm">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            {children}
                                        </table>
                                    </div>
                                ),
                                thead: ({ children }) => (
                                    <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                                        {children}
                                    </thead>
                                ),
                                tbody: ({ children }) => (
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {children}
                                    </tbody>
                                ),
                                tr: ({ children, isHeader }) => (
                                    <tr className={!isHeader ? "hover:bg-slate-50 transition-colors" : ""}>
                                        {children}
                                    </tr>
                                ),
                                th: ({ children }) => (
                                    <th className="px-3 py-2 text-left text-[10px] font-bold text-slate-700 uppercase tracking-wider border-r border-gray-200 last:border-r-0">
                                        {children}
                                    </th>
                                ),
                                td: ({ children }) => (
                                    <td className="px-3 py-2 text-xs text-gray-700 border-r border-gray-100 last:border-r-0">
                                        {children}
                                    </td>
                                )
                            }}
                        >
                            {lesson.content}
                        </ReactMarkdown>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
                        <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Mission Tasks</h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                                {lesson.tasks.filter(t => t.completed).length}/{lesson.tasks.length}
                            </span>
                        </div>
                        <ul className="divide-y divide-slate-100">
                            {lesson.tasks.map((task, index) => (
                                <li key={index} className={clsx(
                                    "flex items-start gap-4 p-4 transition-all duration-200 hover:bg-slate-50 group",
                                    task.completed ? "bg-green-50/50" : ""
                                )}>
                                    <div className={clsx(
                                        "mt-0.5 flex-shrink-0 transition-all duration-300 transform group-hover:scale-110",
                                        task.completed ? "text-green-500" : "text-slate-300"
                                    )}>
                                        {task.completed ? <CheckCircle2 size={20} strokeWidth={2.5} /> : <Circle size={20} strokeWidth={2} />}
                                    </div>
                                    <span className={clsx(
                                        "text-sm font-medium leading-relaxed transition-colors break-words",
                                        task.completed ? "text-slate-500 line-through decoration-slate-300" : "text-slate-700"
                                    )}>
                                        {task.description}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
