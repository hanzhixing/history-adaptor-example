var e=`<div data-host class="space-y-4">
    <header class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p class="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Outer · Vanilla + Web Component
        </p>
        <h1 class="text-xl font-semibold text-slate-800">
            Portal (plain DOM, owns the browser URL)
        </h1>
    </header>

    <nav data-nav class="flex flex-col gap-1">
        <div class="flex items-baseline gap-1">
            <span data-hash-prefix class="font-mono text-slate-400" hidden>/#</span>
            <a data-nav-link href="/portal/home">/portal/home</a>
        </div>
        <div class="flex items-baseline gap-1">
            <span data-hash-prefix class="font-mono text-slate-400" hidden>/#</span>
            <a data-nav-link href="/portal/discussion/42">/portal/discussion/42</a>
        </div>
        <div class="flex items-baseline gap-1">
            <span data-hash-prefix class="font-mono text-slate-400" hidden>/#</span>
            <a data-nav-link href="/portal/user/alice">/portal/user/alice</a>
        </div>
        <div class="flex items-baseline gap-1">
            <span data-hash-prefix class="font-mono text-slate-400" hidden>/#</span>
            <a
                data-nav-link
                href="/portal/articles?user_id=alice&category_id=tech&keyword=router#comments"
                >/portal/articles?user_id=alice&amp;category_id=tech&amp;keyword=router#comments</a
            >
        </div>
        <div class="flex items-baseline gap-1">
            <span data-hash-prefix class="font-mono text-slate-400" hidden>/#</span>
            <a data-nav-link href="/portal/friend?user_id=alice&group=dev#top"
                >/portal/friend?user_id=alice&amp;group=dev#top</a
            >
        </div>
        <div class="flex items-baseline gap-1">
            <span data-hash-prefix class="font-mono text-slate-400" hidden>/#</span>
            <a data-nav-link href="/portal/error/not_found">/portal/error/not_found</a>
        </div>
    </nav>

    <section data-content class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"></section>

    <section class="space-y-3 rounded-xl border-2 border-dashed border-violet-400 p-4">
        <p class="text-xs font-semibold uppercase tracking-widest text-violet-600">
            Nested React app (memory router)
        </p>
        <div id="react-root"></div>
    </section>
</div>
`;export{e as t};