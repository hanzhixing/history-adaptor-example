import {useMemo} from 'react';

import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/github-dark.css';

hljs.registerLanguage('typescript', typescript);

/** The actual source of a file from the selected example (`?raw` imports). */
export const CodeExample = ({title, code}: {title: string; code: string}) => {
    const html = useMemo(() => hljs.highlight(code, {language: 'typescript'}).value, [code]);

    return (
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-700 px-4 py-2">
                <span className="font-mono text-sm font-semibold text-slate-300">{title}</span>
                <span className="text-xs uppercase tracking-widest text-slate-500">actual source</span>
            </div>
            <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                <code
                    className="hljs language-typescript"
                    dangerouslySetInnerHTML={{__html: html}}
                />
            </pre>
        </div>
    );
};
