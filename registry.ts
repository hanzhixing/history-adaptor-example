import type {ComponentType} from 'react';

import addressSource from './components/address.ts?raw';
import reactEmbeddedSource from './apps/reactEmbedded.tsx?raw';
import vanillaHostSource from './apps/vanillaHost.ts?raw';
import vueEmbeddedSource from './apps/vueEmbedded.ts?raw';
import vueHostSource from './apps/vueHost.ts?raw';
import {ReactReactExample} from './examples/react-react/App.tsx';
import reactReactAppSource from './examples/react-react/App.tsx?raw';
import reactReactBridgeSource from './examples/react-react/bridge.ts?raw';
import {
    createHashHost as createReactReactHashHost,
    createHtml5Host as createReactReactHtml5Host,
} from './examples/react-react/host.tsx';
import reactReactHostSource from './examples/react-react/host.tsx?raw';
import reactReactMappingSource from './examples/react-react/mapping.ts?raw';
import {hostHome as reactReactHome} from './examples/react-react/routes.tsx';
import reactReactRoutesSource from './examples/react-react/routes.tsx?raw';
import {ReactVueExample} from './examples/react-vue/App.tsx';
import reactVueAppSource from './examples/react-vue/App.tsx?raw';
import reactVueBridgeSource from './examples/react-vue/bridge.ts?raw';
import {
    createHashHost as createReactVueHashHost,
    createHtml5Host as createReactVueHtml5Host,
} from './examples/react-vue/host.tsx';
import reactVueHostSource from './examples/react-vue/host.tsx?raw';
import reactVueMappingSource from './examples/react-vue/mapping.ts?raw';
import {hostHome as reactVueHome} from './examples/react-vue/routes.tsx';
import reactVueRoutesSource from './examples/react-vue/routes.tsx?raw';
import {mount as mountVanillaReact} from './examples/vanilla-react/main.ts';
import {
    createHashHost as createVanillaReactHashHost,
    createHtml5Host as createVanillaReactHtml5Host,
    formatHashAddress as formatVanillaReactHash,
    formatHtml5Address as formatVanillaReactHtml5,
} from './examples/vanilla-react/host.tsx';
import vanillaReactHostSource from './examples/vanilla-react/host.tsx?raw';
import vanillaReactMainSource from './examples/vanilla-react/main.ts?raw';
import vanillaReactMappingSource from './examples/vanilla-react/mapping.ts?raw';
import {hostHome as vanillaReactHome} from './examples/vanilla-react/routes.tsx';
import vanillaReactRoutesSource from './examples/vanilla-react/routes.tsx?raw';
import {mount as mountVanillaVue} from './examples/vanilla-vue/main.ts';
import {
    createHashHost as createVanillaVueHashHost,
    createHtml5Host as createVanillaVueHtml5Host,
    formatHashAddress as formatVanillaVueHash,
    formatHtml5Address as formatVanillaVueHtml5,
} from './examples/vanilla-vue/host.tsx';
import vanillaVueHostSource from './examples/vanilla-vue/host.tsx?raw';
import vanillaVueMainSource from './examples/vanilla-vue/main.ts?raw';
import vanillaVueMappingSource from './examples/vanilla-vue/mapping.ts?raw';
import {hostHome as vanillaVueHome} from './examples/vanilla-vue/routes.tsx';
import vanillaVueRoutesSource from './examples/vanilla-vue/routes.tsx?raw';
import {mount as mountVueReact} from './examples/vue-react/main.ts';
import {
    createHashHost as createVueReactHashHost,
    createHtml5Host as createVueReactHtml5Host,
} from './examples/vue-react/host.tsx';
import vueReactHostSource from './examples/vue-react/host.tsx?raw';
import vueReactMainSource from './examples/vue-react/main.ts?raw';
import vueReactMappingSource from './examples/vue-react/mapping.ts?raw';
import {hostHome as vueReactHome} from './examples/vue-react/routes.tsx';
import vueReactRoutesSource from './examples/vue-react/routes.tsx?raw';
import {mount as mountVueVue} from './examples/vue-vue/main.ts';
import {
    createHashHost as createVueVueHashHost,
    createHtml5Host as createVueVueHtml5Host,
} from './examples/vue-vue/host.tsx';
import vueVueHostSource from './examples/vue-vue/host.tsx?raw';
import vueVueMainSource from './examples/vue-vue/main.ts?raw';
import vueVueMappingSource from './examples/vue-vue/mapping.ts?raw';
import {hostHome as vueVueHome} from './examples/vue-vue/routes.tsx';
import vueVueRoutesSource from './examples/vue-vue/routes.tsx?raw';
import type {ExampleProps, HostSetup, HostVariant} from './types.ts';

export type ExampleFile = {
    name: string;
    source: string;
};

type ExampleBase = {
    id: string;
    title: string;
    description: string;
    hostHome: string;
    html5: HostVariant;
    hash: HostVariant;
    files: ExampleFile[];
};

export type ComponentExample = ExampleBase & {
    kind: 'component';
    Component: ComponentType<ExampleProps>;
};

export type MountExample = ExampleBase & {
    kind: 'mount';
    mount: (container: HTMLElement, host: HostVariant) => {dispose: () => void};
};

export type Example = ComponentExample | MountExample;

const baseFiles = (sources: Record<string, string>): ExampleFile[] => [
    {name: 'address.ts', source: addressSource},
    ...Object.entries(sources).map(([name, source]) => ({name, source})),
];

const reactHostVariant = (
    createHost: () => HostSetup,
    formatAddress?: (address: string) => string,
): HostVariant => ({createHost, formatAddress});

export const examples: Example[] = [
    {
        kind: 'mount',
        id: 'vanilla-react',
        title: 'Vanilla JS ↔ Nested React',
        description:
            'A plain-JS host (DOM APIs, no framework) owns the browser URL; the embedded React app keeps its routes in memory.',
        hostHome: vanillaReactHome,
        html5: reactHostVariant(createVanillaReactHtml5Host, formatVanillaReactHtml5),
        hash: reactHostVariant(createVanillaReactHashHost, formatVanillaReactHash),
        mount: mountVanillaReact,
        files: [
            ...baseFiles({
                'routes.tsx': vanillaReactRoutesSource,
                'mapping.ts': vanillaReactMappingSource,
                'host.tsx': vanillaReactHostSource,
                'vanillaHost.ts': vanillaHostSource,
                'reactEmbedded.tsx': reactEmbeddedSource,
                'main.ts': vanillaReactMainSource,
            }),
        ],
    },
    {
        kind: 'mount',
        id: 'vanilla-vue',
        title: 'Vanilla JS ↔ Nested Vue',
        description:
            'A plain-JS host (DOM APIs, no framework) owns the browser URL; the embedded Vue app keeps its routes in memory.',
        hostHome: vanillaVueHome,
        html5: reactHostVariant(createVanillaVueHtml5Host, formatVanillaVueHtml5),
        hash: reactHostVariant(createVanillaVueHashHost, formatVanillaVueHash),
        mount: mountVanillaVue,
        files: baseFiles({
            'routes.tsx': vanillaVueRoutesSource,
            'mapping.ts': vanillaVueMappingSource,
            'host.tsx': vanillaVueHostSource,
            'vanillaHost.ts': vanillaHostSource,
            'vueEmbedded.ts': vueEmbeddedSource,
            'main.ts': vanillaVueMainSource,
        }),
    },
    {
        kind: 'mount',
        id: 'vue-react',
        title: 'Vue SPA ↔ Nested React',
        description:
            'A Vue SPA (Vue Router, Vue components) owns the browser URL; the embedded React app keeps its routes in memory.',
        hostHome: vueReactHome,
        html5: reactHostVariant(createVueReactHtml5Host),
        hash: reactHostVariant(createVueReactHashHost),
        mount: mountVueReact,
        files: baseFiles({
            'routes.tsx': vueReactRoutesSource,
            'mapping.ts': vueReactMappingSource,
            'host.tsx': vueReactHostSource,
            'vueHost.ts': vueHostSource,
            'reactEmbedded.tsx': reactEmbeddedSource,
            'main.ts': vueReactMainSource,
        }),
    },
    {
        kind: 'mount',
        id: 'vue-vue',
        title: 'Vue SPA ↔ Nested Vue',
        description:
            'A Vue SPA (Vue Router, Vue components) owns the browser URL; a second Vue memory router is embedded inside it.',
        hostHome: vueVueHome,
        html5: reactHostVariant(createVueVueHtml5Host),
        hash: reactHostVariant(createVueVueHashHost),
        mount: mountVueVue,
        files: baseFiles({
            'routes.tsx': vueVueRoutesSource,
            'mapping.ts': vueVueMappingSource,
            'host.tsx': vueVueHostSource,
            'vueHost.ts': vueHostSource,
            'vueEmbedded.ts': vueEmbeddedSource,
            'main.ts': vueVueMainSource,
        }),
    },
    {
        kind: 'component',
        id: 'react-vue',
        title: 'React SPA ↔ Nested Vue',
        description:
            'A React SPA (React Router) owns the browser URL; the embedded Vue app keeps its routes in memory.',
        hostHome: reactVueHome,
        html5: reactHostVariant(createReactVueHtml5Host),
        hash: reactHostVariant(createReactVueHashHost),
        Component: ReactVueExample,
        files: baseFiles({
            'routes.tsx': reactVueRoutesSource,
            'mapping.ts': reactVueMappingSource,
            'host.tsx': reactVueHostSource,
            'bridge.ts': reactVueBridgeSource,
            'App.tsx': reactVueAppSource,
        }),
    },
    {
        kind: 'component',
        id: 'react-react',
        title: 'React SPA ↔ Nested React',
        description:
            'A React SPA (React Router) owns the browser URL; a second, independent React memory router is embedded inside it.',
        hostHome: reactReactHome,
        html5: reactHostVariant(createReactReactHtml5Host),
        hash: reactHostVariant(createReactReactHashHost),
        Component: ReactReactExample,
        files: baseFiles({
            'routes.tsx': reactReactRoutesSource,
            'mapping.ts': reactReactMappingSource,
            'host.tsx': reactReactHostSource,
            'bridge.ts': reactReactBridgeSource,
            'App.tsx': reactReactAppSource,
        }),
    },
];
