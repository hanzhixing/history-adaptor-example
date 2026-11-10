import{a as e,n as t,r as n}from"./style--f9_Lsz9.js";import{_ as r,a as i,c as a,d as o,g as s,h as c,l,m as u,n as d,o as f,p,r as m,s as h,t as g,u as _,v}from"./_router_module-chunk-z47OSnh9.js";import{a as y,c as b,i as x,n as S,o as C,r as w,s as T,t as E}from"./components-B1yXkH4d.js";import{a as D,n as O,s as k,t as A}from"./helper-4uJoQGR2.js";var j=class{},M=p({selector:`app-root`,imports:[a],host:{"data-host":``},template:`
        <div class="space-y-4">
            <router-outlet />

            <section class="space-y-3 rounded-xl border-2 border-dashed border-violet-400 p-4">
                <p class="text-xs font-semibold uppercase tracking-widest text-violet-600">
                    Nested Solid app (memory router)
                </p>
                <div id="solid-root"></div>
            </section>
        </div>
    `})(j),N=new u(`HASH_MODE`),P=T(`<div data-embedded class=space-y-4><nav class="flex flex-col gap-1">`),F=`break-all font-mono text-base underline-offset-2`,I=`text-sky-700 hover:text-sky-900 hover:underline`,L=`font-semibold text-sky-900 underline`,R=e=>(()=>{var t=P(),n=t.firstChild;return y(n,b(E,{href:`/news`,end:!0,class:F,inactiveClass:I,activeClass:L,children:`/news`}),null),y(n,b(E,{href:`/discussion/42`,end:!0,class:F,inactiveClass:I,activeClass:L,children:`/discussion/42`}),null),y(n,b(E,{href:`/user/alice`,end:!0,class:F,inactiveClass:I,activeClass:L,children:`/user/alice`}),null),y(n,b(E,{href:`/user/alice/post?category=tech&keyword=router#comments`,end:!0,class:F,inactiveClass:I,activeClass:L,children:`/user/alice/post?category=tech&keyword=router#comments`}),null),y(n,b(E,{href:`/user/alice/friend?group=dev#top`,end:!0,class:F,inactiveClass:I,activeClass:L,children:`/user/alice/friend?group=dev#top`}),null),y(n,b(E,{href:`/404`,end:!0,class:F,inactiveClass:I,activeClass:L,children:`/404`}),null),y(t,()=>e.children,null),t})(),z=T(`<div class="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"><div class="text-xs font-semibold uppercase tracking-widest text-slate-400">Content Component</div><p class="text-2xl font-bold text-slate-900">Now we are on page <span class="break-all font-mono text-slate-700">`),B=()=>{let t=x();return(()=>{var n=z(),r=n.firstChild.nextSibling.firstChild.nextSibling;return y(r,()=>e(t)),n})()},V=[{path:`/news`,component:B},{path:`/discussion/:discussion_id`,component:B},{path:`/user/:user_id`,component:B},{path:`/user/:user_id/post`,component:B},{path:`/user/:user_id/friend`,component:B},{path:`/404`,component:B},{path:`*`,component:B}],H=e=>b(S,{get history(){return e.history},root:R,children:V}),U=(e,t)=>C(()=>b(H,{history:t}),e),W=class{hashMode=c(N);address$=c(h).events.pipe(r(e=>e instanceof f),v(()=>c(h).url),s(c(h).url))},G=p({selector:`ng-content-page`,imports:[_],template:`
        <div class="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div class="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Content Component
            </div>
            <p class="text-2xl font-bold text-slate-900">
                Now we are on page
                @if (hashMode) {
                    <span class="font-mono text-slate-400">/#</span>
                }
                <span class="break-all font-mono text-slate-700">{{ address$ | async }}</span>
            </p>
        </div>
    `})(W),K=class{hashMode=c(N)},q=[{path:``,component:p({selector:`app-layout`,imports:[g,d,a],template:`
        <div class="space-y-4">
            <header class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p class="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Outer · Angular SPA
                </p>
                <h1 class="text-xl font-semibold text-slate-800">
                    Portal (Angular Router owns the browser URL)
                </h1>
            </header>

            <nav class="flex flex-col gap-1">
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/home"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/home</a
                    >
                </div>
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/discussion/42"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/discussion/42</a
                    >
                </div>
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/user/alice"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/user/alice</a
                    >
                </div>
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/articles"
                        [queryParams]="{user_id: 'alice', category_id: 'tech', keyword: 'router'}"
                        fragment="comments"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/articles?user_id=alice&amp;category_id=tech&amp;keyword=router#comments</a
                    >
                </div>
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/friend"
                        [queryParams]="{user_id: 'alice', group: 'dev'}"
                        fragment="top"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/friend?user_id=alice&amp;group=dev#top</a
                    >
                </div>
                <div class="flex items-baseline gap-1">
                    @if (hashMode) {
                        <span class="font-mono text-slate-400">/#</span>
                    }
                    <a
                        routerLink="/portal/error/not_found"
                        [routerLinkActiveOptions]="{exact: true}"
                        routerLinkActive="font-semibold text-sky-900 underline"
                        ariaCurrentWhenActive="page"
                        class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                        >/portal/error/not_found</a
                    >
                </div>
            </nav>

            <router-outlet />
        </div>
    `})(K),children:[{path:``,pathMatch:`full`,redirectTo:`portal/home`},{path:`portal/home`,component:G},{path:`portal/discussion/:discussion_id`,component:G},{path:`portal/user/:user_id`,component:G},{path:`portal/articles`,component:G},{path:`portal/friend`,component:G},{path:`portal/error/not_found`,component:G}]},{path:`**`,redirectTo:`portal/home`}],J=[{from:`/portal/home`,to:`/news`},{from:`/portal/error/not_found`,to:`/404`},{from:`/portal/discussion/:discussion_id`,to:`/discussion/:discussion_id`},{from:`/portal/user/:user_id`,to:`/user/:user_id`},{from:/^\/portal\/articles\?user_id=(?<user_id>[^&#]*)&category_id=(?<category_id>[^&#]*)&keyword=(?<keyword>[^&#]*)#(?<comments>[^#]*)$/,to:`/user/$<user_id>/post?category=$<category_id>&keyword=$<keyword>#$<comments>`},{from:`/portal/friend{?user_id,group}{#hash}`,to:`/user/{user_id}/friend{?group}{#hash}`}],Y=[{from:`/news`,to:`/portal/home`},{from:`/discussion/:discussion_id`,to:`/portal/discussion/:discussion_id`},{from:`/user/:user_id`,to:`/portal/user/:user_id`},{from:/^\/user\/(?<user_id>[^/?#]+)\/post\?category=(?<category_id>[^&#]*)&keyword=(?<keyword>[^&#]*)#(?<comments>[^#]*)$/,to:`/portal/articles?user_id=$<user_id>&category_id=$<category_id>&keyword=$<keyword>#$<comments>`},{from:`/user/{user_id}/friend{?group}{#hash}`,to:`/portal/friend{?user_id,group}{#hash}`}],X=e=>{let t,n,r,a;return{mount:async s=>{let c=document.createElement(`app-root`);s.append(c),t=await l(M,{providers:[{provide:N,useValue:e===`hash`},e===`hash`?m(q,i()):m(q)]});let u=t.injector.get(h),d=t.injector.get(o),f=w();return f.set({value:`/news`,replace:!0}),[r,a]=k([{key:`host`,history:O(u,d),adaptors:[{target:`nested`,adapt:A(J)}]},{key:`nested`,history:D(f),adaptors:[{target:`host`,adapt:A(Y)}]}]),n=U(s.querySelector(`#solid-root`),f),r},dispose:()=>{n?.(),r?.dispose?.(),a?.dispose?.(),t?.destroy()}}},Z=new URLSearchParams(location.search),Q=Z.get(`mode`)===`hash`?`hash`:`html5`;Z.has(`sandbox`)&&history.replaceState(null,``,Q===`hash`?`#/portal/home`:`/portal/home`),(async()=>{let e=await X(Q).mount(document.getElementById(`root`));t(e,Q),n(e)})();