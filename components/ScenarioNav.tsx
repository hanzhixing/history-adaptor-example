import {examples} from '../registry.ts';

type Props = {
    value: string;
    onChange: (id: string) => void;
};

const base = 'w-full rounded-lg border px-3 py-2 text-left text-base transition-colors';
const active = 'border-slate-800 bg-slate-800 text-white';
const inactive = 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100';

export const ScenarioNav = ({value, onChange}: Props) => (
    <div className="space-y-2">
        <span className="text-sm font-medium text-slate-500">Example</span>
        <nav className="flex flex-col gap-2">
            {examples.map((example) => (
                <button
                    key={example.id}
                    type="button"
                    className={`${base} ${example.id === value ? active : inactive}`}
                    aria-pressed={example.id === value}
                    onClick={() => onChange(example.id)}
                >
                    {example.title}
                </button>
            ))}
        </nav>
    </div>
);
