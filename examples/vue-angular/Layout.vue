<template>
    <div class="space-y-4">
        <header class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p class="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Outer · Vue SPA
            </p>
            <h1 class="text-xl font-semibold text-slate-800">
                Portal (Vue Router owns the browser URL)
            </h1>
        </header>

        <nav class="flex flex-col gap-1">
            <div class="flex items-baseline gap-1">
                <span v-if="hashMode" class="font-mono text-slate-400">/#</span>
                <RouterLink
                    to="/portal/home"
                    class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                    exact-active-class="font-semibold underline"
                    >/portal/home</RouterLink
                >
            </div>
            <div class="flex items-baseline gap-1">
                <span v-if="hashMode" class="font-mono text-slate-400">/#</span>
                <RouterLink
                    to="/portal/discussion/42"
                    class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                    exact-active-class="font-semibold underline"
                    >/portal/discussion/42</RouterLink
                >
            </div>
            <div class="flex items-baseline gap-1">
                <span v-if="hashMode" class="font-mono text-slate-400">/#</span>
                <RouterLink
                    to="/portal/user/alice"
                    class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                    exact-active-class="font-semibold underline"
                    >/portal/user/alice</RouterLink
                >
            </div>
            <div class="flex items-baseline gap-1">
                <span v-if="hashMode" class="font-mono text-slate-400">/#</span>
                <RouterLink
                    to="/portal/articles?user_id=alice&category_id=tech&keyword=router#comments"
                    class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                    exact-active-class="font-semibold underline"
                    >/portal/articles?user_id=alice&amp;category_id=tech&amp;keyword=router#comments</RouterLink
                >
            </div>
            <div class="flex items-baseline gap-1">
                <span v-if="hashMode" class="font-mono text-slate-400">/#</span>
                <RouterLink
                    to="/portal/friend?user_id=alice&group=dev#top"
                    class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                    exact-active-class="font-semibold underline"
                    >/portal/friend?user_id=alice&amp;group=dev#top</RouterLink
                >
            </div>
            <div class="flex items-baseline gap-1">
                <span v-if="hashMode" class="font-mono text-slate-400">/#</span>
                <RouterLink
                    to="/portal/error/not_found"
                    class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                    exact-active-class="font-semibold underline"
                    >/portal/error/not_found</RouterLink
                >
            </div>
        </nav>

        <RouterView />
    </div>
</template>

<script setup lang="ts">
import {inject} from 'vue';
import {RouterLink, RouterView} from 'vue-router';

const hashMode = inject('hashMode', false);
</script>
