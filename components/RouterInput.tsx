import {useEffect, useState} from 'react';

type Props = {
    value: string;
    onNavigate: (address: string) => void;
};

/** Type an address and press Enter — the same result as clicking a link. */
export const RouterInput = ({value, onNavigate}: Props) => {
    const [draft, setDraft] = useState(value);

    useEffect(() => {
        setDraft(value);
    }, [value]);

    return (
        <form
            className="flex gap-2"
            onSubmit={(event) => {
                event.preventDefault();
                const next = draft.trim();
                if (next) {
                    onNavigate(next);
                }
            }}
        >
            <input
                className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 font-mono text-base"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Type an address and press Enter"
                aria-label="Address"
            />
            <button
                type="submit"
                className="rounded-md bg-slate-700 px-4 py-2 text-base font-medium text-white hover:brightness-110"
            >
                Go
            </button>
        </form>
    );
};
