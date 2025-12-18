import { useMemo } from 'react';

// Console interceptor script (defined outside component to prevent recreating)
const CONSOLE_SCRIPT = `
    <script>
        (function() {
            // Override console methods to send to parent
            console.log = function(...args) {
                window.parent.postMessage({
                    type: 'CONSOLE',
                    level: 'log',
                    payload: args.map(arg => {
                        if (typeof arg === 'object' && arg !== null) {
                            try {
                                return JSON.stringify(arg, null, 2);
                            } catch (e) {
                                return String(arg);
                            }
                        }
                        return String(arg);
                    })
                }, '*');
            };
            
            console.error = function(...args) {
                window.parent.postMessage({
                    type: 'CONSOLE',
                    level: 'error',
                    payload: args.map(arg => String(arg))
                }, '*');
            };
            
            console.warn = function(...args) {
                window.parent.postMessage({
                    type: 'CONSOLE',
                    level: 'warn',
                    payload: args.map(arg => String(arg))
                }, '*');
            };
            
            // Catch runtime errors
            window.addEventListener('error', function(e) {
                window.parent.postMessage({
                    type: 'CONSOLE',
                    level: 'error',
                    payload: [e.message + ' at line ' + e.lineno]
                }, '*');
            });
        })();
    </script>
`;

export default function PreviewPane({ compiledCode, isConsoleOpen, consoleLogs }) {
    // Inject console script into compiled code
    const finalCode = useMemo(() => {
        if (!compiledCode) return '';
        
        if (compiledCode.includes('</head>')) {
            return compiledCode.replace('</head>', CONSOLE_SCRIPT + '</head>');
        } else if (compiledCode.includes('<head>')) {
            return compiledCode.replace('<head>', '<head>' + CONSOLE_SCRIPT);
        } else {
            return CONSOLE_SCRIPT + compiledCode;
        }
    }, [compiledCode]);

    return (
        <div className="h-full flex flex-col bg-white">
            <div className="flex-1 bg-white relative">
                <div className="absolute inset-0">
                    <iframe
                        key={compiledCode} // Force recreate on code change
                        title="preview"
                        srcDoc={finalCode}
                        className="w-full h-full border-none"
                        sandbox="allow-scripts"
                    />
                </div>
            </div>

            {isConsoleOpen && (
                <div className="h-1/3 bg-gray-900 border-t border-gray-700 flex flex-col">
                    <div className="h-8 bg-gray-800 text-gray-400 px-3 flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                        <span>Console</span>
                        <span className="text-gray-500 normal-case">{consoleLogs.length} messages</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 font-mono text-xs space-y-1">
                        {consoleLogs.length === 0 && (
                            <div className="text-gray-500 italic p-2">
                                No console output yet. Try running your code!
                            </div>
                        )}
                        {consoleLogs.map((log, i) => {
                            const isObject = typeof log === 'object' && log !== null;
                            const level = isObject ? log.level : 'log';
                            const message = isObject ? log.message : String(log);
                            const timestamp = isObject ? log.timestamp : '';
                            
                            const colorClass = {
                                log: 'text-green-400',
                                error: 'text-red-400',
                                warn: 'text-yellow-400'
                            }[level] || 'text-green-400';
                            
                            const icon = {
                                log: '>',
                                error: '✕',
                                warn: '⚠'
                            }[level] || '>';
                            
                            return (
                                <div key={i} className={`${colorClass} flex items-start gap-2 py-1 px-2 hover:bg-gray-800/50 rounded`}>
                                    <span className="opacity-50 flex-shrink-0">{icon}</span>
                                    <span className="flex-1 break-all whitespace-pre-wrap">{message}</span>
                                    {timestamp && (
                                        <span className="text-gray-600 text-xs flex-shrink-0">{timestamp}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
