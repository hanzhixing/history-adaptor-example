import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github-dark.css';
import {useMemo, useState} from 'react';

import type {ExampleFile} from '../registry.ts';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

const groups = [
    {
        id: 'example' as const,
        label: 'Example sandbox',
        hint: 'Only exists to run the example inside an iframe.',
    },
    {
        id: 'app' as const,
        label: 'Your app code',
        hint: 'Copy this into a real project.',
    },
];

const copyText = async (text: string): Promise<void> => {
    try {
        await navigator.clipboard.writeText(text);
    } catch {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.append(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
    }
};

export const SourceTabs = ({files}: {files: ExampleFile[]}) => {
    const initial = files.find((file) => file.group === 'app') ?? files[0];
    const [active, setActive] = useState(initial?.name ?? '');
    const [copied, setCopied] = useState(false);
    const file = files.find((item) => item.name === active) ?? initial;

    const html = useMemo(
        () =>
            file
                ? hljs.highlight(file.source, {language: file.lang ?? 'typescript'}).value
                : '',
        [file],
    );

    if (!file) {
        return null;
    }

    const onCopy = async (): Promise<void> => {
        await copyText(file.source);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
            <div className="space-y-3 border-b border-slate-700 px-3 py-3">
                {groups.map((group, index) => {
                    const groupFiles = files.filter((item) => item.group === group.id);
                    if (groupFiles.length === 0) {
                        return null;
                    }

                    return (
                        <div
                            key={group.id}
                            className={index > 0 ? 'border-t border-slate-700 pt-3' : undefined}
                        >
                            <div className="mb-1 flex flex-wrap items-baseline gap-2">
                                <span
                                    className={`text-xs font-semibold uppercase tracking-widest ${
                                        group.id === 'app'
                                            ? 'text-sky-400'
                                            : 'text-slate-500'
                                    }`}
                                >
                                    {group.label}
                                </span>
                                <span className="text-xs text-slate-500">{group.hint}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {groupFiles.map((item) => (
                                    <button
                                        key={item.name}
                                        type="button"
                                        className={`rounded-md px-3 py-1 font-mono text-sm transition-colors ${
                                            item.name === file.name
                                                ? 'bg-slate-700 text-white'
                                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                        }`}
                                        aria-pressed={item.name === file.name}
                                        onClick={() => setActive(item.name)}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center justify-between gap-3 border-b border-slate-700 px-4 py-2">
                <span className="font-mono text-sm font-semibold text-slate-300">
                    {file.name}
                </span>
                <button
                    type="button"
                    className="rounded-md border border-slate-600 px-3 py-1 text-sm text-slate-300 hover:bg-slate-800"
                    onClick={onCopy}
                >
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>

            <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                <code
                    className={`hljs language-${file.lang ?? 'typescript'}`}
                    dangerouslySetInnerHTML={{__html: html}}
                />
            </pre>
        </div>
    );
};
