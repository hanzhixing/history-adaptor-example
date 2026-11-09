import type {BrowserMode} from '../types.ts';

type Props = {
    value: BrowserMode;
    onChange: (mode: BrowserMode) => void;
};

const base = 'flex-1 px-4 py-2 text-base font-medium transition-colors';
const active = 'bg-slate-800 text-white';
const inactive = 'bg-white text-slate-600 hover:bg-slate-100';

/** Left = HTML5, right = hash. */
export const BrowserModeSwitch = ({value, onChange}: Props) => (
    <div className="space-y-2">
        <span className="text-sm font-medium text-slate-500">Browser routing</span>
        <div className="flex overflow-hidden rounded-full border border-slate-300 shadow-sm">
            <button
                type="button"
                className={`${base} ${value === 'html5' ? active : inactive}`}
                aria-pressed={value === 'html5'}
                onClick={() => onChange('html5')}
            >
                HTML5
            </button>
            <button
                type="button"
                className={`${base} ${value === 'hash' ? active : inactive}`}
                aria-pressed={value === 'hash'}
                onClick={() => onChange('hash')}
            >
                Hash
            </button>
        </div>
    </div>
);
