import{n as e,r as t}from"./style--f9_Lsz9.js";import{_ as n,c as r,d as i,f as a,g as o,h as s,i as c,l,n as u,o as d,p as f,r as p,s as m,t as h,u as ee,v as te}from"./_router_module-chunk-z47OSnh9.js";import{n as g,o as _,s as v,t as y}from"./helper-4uJoQGR2.js";import{_ as b,a as x,c as S,d as C,f as w,g as T,h as E,i as ne,l as D,m as O,n as k,o as A,p as j,s as M,t as N,u as P,v as F,y as I}from"./vue-router-DdMUyaVB.js";var L={"data-host":``,class:`space-y-4`},R=O({__name:`App`,setup(e){return(e,t)=>(T(),C(`div`,L,[j(F(k)),t[0]||=D(`section`,{class:`space-y-3 rounded-xl border-2 border-dashed border-violet-400 p-4`},[D(`p`,{class:`text-xs font-semibold uppercase tracking-widest text-violet-600`},` Nested Angular app (memory router) `),D(`div`,{id:`angular-root`})],-1)]))}}),z=class extends a{#e=[{url:`/`,state:null}];#t=0;#n=new Set;path(){return this.#e[this.#t].url}prepareExternalUrl(e){return e}getState(){return this.#e[this.#t].state}pushState(e,t,n,r){this.#r({url:n+r,state:e},!1)}replaceState(e,t,n,r){this.#r({url:n+r,state:e},!0)}forward(){this.historyGo(1)}back(){this.historyGo(-1)}historyGo(e){let t=this.#t+e;t<0||t>=this.#e.length||(this.#t=t,this.#i())}onPopState(e){this.#n.add(e)}getBaseHref(){return`/`}#r(e,t){t?this.#e[this.#t]=e:(this.#e.splice(this.#t+1),this.#e.push(e),this.#t++),this.#i()}#i(){let e=this.#e[this.#t].state;this.#n.forEach(t=>t({type:`popstate`,state:e}))}},B=f({selector:`nested-angular`,imports:[h,u,r],host:{"data-embedded":``},template:`
        <div class="space-y-4">
            <nav class="flex flex-col gap-1">
                <a
                    routerLink="/news"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/news</a
                >
                <a
                    routerLink="/discussion/42"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/discussion/42</a
                >
                <a
                    routerLink="/user/alice"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/user/alice</a
                >
                <a
                    routerLink="/user/alice/post"
                    [queryParams]="{category: 'tech', keyword: 'router'}"
                    fragment="comments"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/user/alice/post?category=tech&amp;keyword=router#comments</a
                >
                <a
                    routerLink="/user/alice/friend"
                    [queryParams]="{group: 'dev'}"
                    fragment="top"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/user/alice/friend?group=dev#top</a
                >
                <a
                    routerLink="/404"
                    [routerLinkActiveOptions]="{exact: true}"
                    routerLinkActive="font-semibold text-sky-900 underline"
                    ariaCurrentWhenActive="page"
                    class="break-all font-mono text-base text-sky-700 hover:text-sky-900 hover:underline"
                    >/404</a
                >
            </nav>
            <router-outlet />
        </div>
    `})(class{}),V=class{address$=s(m).events.pipe(n(e=>e instanceof d),te(()=>s(m).url),o(s(m).url))},H=f({selector:`ng-content-page`,imports:[ee],template:`
        <div class="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div class="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Content Component
            </div>
            <p class="text-2xl font-bold text-slate-900">
                Now we are on page
                <span class="break-all font-mono text-slate-700">{{ address$ | async }}</span>
            </p>
        </div>
    `})(V),U=[{path:``,pathMatch:`full`,redirectTo:`news`},{path:`news`,component:H},{path:`discussion/:discussion_id`,component:H},{path:`user/:user_id`,component:H},{path:`user/:user_id/post`,component:H},{path:`user/:user_id/friend`,component:H},{path:`404`,component:H},{path:`**`,redirectTo:`404`}],W={class:`space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm`},G={class:`text-2xl font-bold text-slate-900`},K={key:0,class:`font-mono text-slate-400`},re={class:`break-all font-mono text-slate-700`},q=O({__name:`Content`,setup(e){let t=E(`hashMode`,!1),n=M();return(e,r)=>(T(),C(`div`,W,[r[1]||=D(`div`,{class:`text-xs font-semibold uppercase tracking-widest text-slate-400`},` Content Component `,-1),D(`p`,G,[r[0]||=w(` Now we are on page `,-1),F(t)?(T(),C(`span`,K,`/#`)):P(``,!0),D(`span`,re,I(F(n).fullPath),1)])]))}}),J={class:`space-y-4`},Y={class:`flex flex-col gap-1`},X={class:`flex items-baseline gap-1`},ie={key:0,class:`font-mono text-slate-400`},ae={class:`flex items-baseline gap-1`},oe={key:0,class:`font-mono text-slate-400`},se={class:`flex items-baseline gap-1`},ce={key:0,class:`font-mono text-slate-400`},le={class:`flex items-baseline gap-1`},ue={key:0,class:`font-mono text-slate-400`},de={class:`flex items-baseline gap-1`},fe={key:0,class:`font-mono text-slate-400`},pe={class:`flex items-baseline gap-1`},me={key:0,class:`font-mono text-slate-400`},he=[{path:`/`,component:O({__name:`Layout`,setup(e){let t=E(`hashMode`,!1);return(e,n)=>(T(),C(`div`,J,[n[6]||=D(`header`,{class:`rounded-xl border border-slate-200 bg-white p-4 shadow-sm`},[D(`p`,{class:`text-xs font-semibold uppercase tracking-widest text-slate-400`},` Outer · Vue SPA `),D(`h1`,{class:`text-xl font-semibold text-slate-800`},` Portal (Vue Router owns the browser URL) `)],-1),D(`nav`,Y,[D(`div`,X,[F(t)?(T(),C(`span`,ie,`/#`)):P(``,!0),j(F(N),{to:`/portal/home`,class:`break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline`,"exact-active-class":`font-semibold underline`},{default:b(()=>[...n[0]||=[w(`/portal/home`,-1)]]),_:1})]),D(`div`,ae,[F(t)?(T(),C(`span`,oe,`/#`)):P(``,!0),j(F(N),{to:`/portal/discussion/42`,class:`break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline`,"exact-active-class":`font-semibold underline`},{default:b(()=>[...n[1]||=[w(`/portal/discussion/42`,-1)]]),_:1})]),D(`div`,se,[F(t)?(T(),C(`span`,ce,`/#`)):P(``,!0),j(F(N),{to:`/portal/user/alice`,class:`break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline`,"exact-active-class":`font-semibold underline`},{default:b(()=>[...n[2]||=[w(`/portal/user/alice`,-1)]]),_:1})]),D(`div`,le,[F(t)?(T(),C(`span`,ue,`/#`)):P(``,!0),j(F(N),{to:`/portal/articles?user_id=alice&category_id=tech&keyword=router#comments`,class:`break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline`,"exact-active-class":`font-semibold underline`},{default:b(()=>[...n[3]||=[w(`/portal/articles?user_id=alice&category_id=tech&keyword=router#comments`,-1)]]),_:1})]),D(`div`,de,[F(t)?(T(),C(`span`,fe,`/#`)):P(``,!0),j(F(N),{to:`/portal/friend?user_id=alice&group=dev#top`,class:`break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline`,"exact-active-class":`font-semibold underline`},{default:b(()=>[...n[4]||=[w(`/portal/friend?user_id=alice&group=dev#top`,-1)]]),_:1})]),D(`div`,pe,[F(t)?(T(),C(`span`,me,`/#`)):P(``,!0),j(F(N),{to:`/portal/error/not_found`,class:`break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline`,"exact-active-class":`font-semibold underline`},{default:b(()=>[...n[5]||=[w(`/portal/error/not_found`,-1)]]),_:1})])]),j(F(k))]))}}),children:[{path:`portal/home`,component:q},{path:`portal/discussion/:discussion_id`,component:q},{path:`portal/user/:user_id`,component:q},{path:`portal/articles`,component:q},{path:`portal/friend`,component:q},{path:`portal/error/not_found`,component:q}]},{path:`/:pathMatch(.*)*`,redirect:`/portal/home`}],Z=[{from:`/portal/home`,to:`/news`},{from:`/portal/error/not_found`,to:`/404`},{from:`/portal/discussion/:discussion_id`,to:`/discussion/:discussion_id`},{from:`/portal/user/:user_id`,to:`/user/:user_id`},{from:/^\/portal\/articles\?user_id=(?<user_id>[^&#]*)&category_id=(?<category_id>[^&#]*)&keyword=(?<keyword>[^&#]*)#(?<comments>[^#]*)$/,to:`/user/$<user_id>/post?category=$<category_id>&keyword=$<keyword>#$<comments>`},{from:`/portal/friend{?user_id,group}{#hash}`,to:`/user/{user_id}/friend{?group}{#hash}`}],ge=[{from:`/news`,to:`/portal/home`},{from:`/discussion/:discussion_id`,to:`/portal/discussion/:discussion_id`},{from:`/user/:user_id`,to:`/portal/user/:user_id`},{from:/^\/user\/(?<user_id>[^/?#]+)\/post\?category=(?<category_id>[^&#]*)&keyword=(?<keyword>[^&#]*)#(?<comments>[^#]*)$/,to:`/portal/articles?user_id=$<user_id>&category_id=$<category_id>&keyword=$<keyword>#$<comments>`},{from:`/user/{user_id}/friend{?group}{#hash}`,to:`/portal/friend{?user_id,group}{#hash}`}],_e=e=>{let t=ne({history:e===`hash`?x():A(),routes:he}),n,r,a,o;return{mount:async s=>{n=S(R),n.provide(`hashMode`,e===`hash`),n.use(t),n.mount(s),s.querySelector(`#angular-root`).append(document.createElement(`nested-angular`));let u=await l(B,{providers:[p(U,c()),{provide:i,useFactory:()=>new i(new z)}]});r=u;let d=u.injector.get(m),f=u.injector.get(i);return await d.navigateByUrl(`/news`),[a,o]=v([{key:`host`,history:_(t),adaptors:[{target:`nested`,adapt:y(Z)}]},{key:`nested`,history:g(d,f),adaptors:[{target:`host`,adapt:y(ge)}]}]),a},dispose:()=>{a?.dispose?.(),o?.dispose?.(),r?.destroy(),n?.unmount()}}},Q=new URLSearchParams(location.search),$=Q.get(`mode`)===`hash`?`hash`:`html5`;Q.has(`sandbox`)&&history.replaceState(null,``,$===`hash`?`#/portal/home`:`/portal/home`),(async()=>{let n=await _e($).mount(document.getElementById(`root`));e(n,$),t(n)})();