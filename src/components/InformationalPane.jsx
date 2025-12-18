import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export default function InformationalPane({ item, onComplete }) {
    return (
        <div className="h-full flex flex-col bg-slate-50">
            {/* Header - More Compact */}
            <div className="px-6 py-3 bg-white border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-wider">
                            <BookOpen size={14} />
                            <span>Reading</span>
                        </div>
                        <div className="h-4 w-px bg-gray-300"></div>
                        <h1 className="text-lg font-bold text-slate-900">{item.title}</h1>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <Clock size={12} />
                        <span>{item.duration}</span>
                    </div>
                </div>
            </div>

            {/* Content - More Space */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="max-w-4xl mx-auto">
                    <article className="prose prose-slate max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ children }) => (
                                    <h1 className="text-2xl font-bold text-slate-900 mb-4 pb-3 border-b-2 border-presuniv-maroon">
                                        {children}
                                    </h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-lg font-semibold text-slate-700 mt-4 mb-2">
                                        {children}
                                    </h3>
                                ),
                                p: ({ children }) => (
                                    <p className="text-gray-700 leading-relaxed mb-3 text-[15px]">
                                        {children}
                                    </p>
                                ),
                                ul: ({ children }) => (
                                    <ul className="list-disc list-inside space-y-1.5 mb-3 text-gray-700">
                                        {children}
                                    </ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="list-decimal list-inside space-y-1.5 mb-3 text-gray-700">
                                        {children}
                                    </ol>
                                ),
                                li: ({ children }) => (
                                    <li className="text-gray-700 text-[15px]">{children}</li>
                                ),
                                code: ({ inline, children }) => (
                                    inline ? (
                                        <code className="bg-slate-100 text-presuniv-maroon px-1.5 py-0.5 rounded text-[13px] font-mono">
                                            {children}
                                        </code>
                                    ) : (
                                        <code className="font-mono text-[13px]">{children}</code>
                                    )
                                ),
                                pre: ({ children }) => (
                                    <pre className="bg-slate-800 text-slate-100 rounded-lg p-3 overflow-x-auto my-3 text-[13px]">
                                        {children}
                                    </pre>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-presuniv-maroon bg-red-50 pl-3 py-1.5 my-3 italic text-gray-700 text-[15px]">
                                        {children}
                                    </blockquote>
                                ),
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
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-r border-gray-200 last:border-r-0">
                                        {children}
                                    </th>
                                ),
                                td: ({ children }) => (
                                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-100 last:border-r-0">
                                        {children}
                                    </td>
                                ),
                                hr: () => (
                                    <hr className="my-6 border-gray-200" />
                                ),
                                strong: ({ children }) => (
                                    <strong className="font-bold text-slate-900">{children}</strong>
                                ),
                                em: ({ children }) => (
                                    <em className="italic text-gray-600">{children}</em>
                                ),
                                a: ({ href, children }) => (
                                    <a 
                                        href={href} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-presuniv-maroon hover:underline"
                                    >
                                        {children}
                                    </a>
                                )
                            }}
                        >
                            {item.content}
                        </ReactMarkdown>
                    </article>
                </div>
            </div>

            {/* Footer - More Compact */}
            <div className="px-6 py-2.5 bg-white border-t">
                <button
                    onClick={onComplete}
                    className="w-full py-2 bg-presuniv-maroon text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                    Mark as Complete & Continue
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}
