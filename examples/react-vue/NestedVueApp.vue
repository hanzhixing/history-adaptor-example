<template>
    <div data-embedded class="space-y-4">
        <nav class="flex flex-col gap-1">
            <RouterLink
                to="/news"
                class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                exact-active-class="font-semibold underline"
                >/news</RouterLink
            >
            <RouterLink
                to="/discussion/42"
                class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                exact-active-class="font-semibold underline"
                >/discussion/42</RouterLink
            >
            <RouterLink
                to="/user/alice"
                class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                exact-active-class="font-semibold underline"
                >/user/alice</RouterLink
            >
            <RouterLink
                to="/user/alice/post?category=tech&keyword=router#comments"
                class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                exact-active-class="font-semibold underline"
                >/user/alice/post?category=tech&amp;keyword=router#comments</RouterLink
            >
            <RouterLink
                to="/user/alice/friend?group=dev#top"
                class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                exact-active-class="font-semibold underline"
                >/user/alice/friend?group=dev#top</RouterLink
            >
            <RouterLink
                to="/404"
                class="break-all font-mono text-base text-sky-700 underline-offset-2 hover:text-sky-900 hover:underline"
                exact-active-class="font-semibold underline"
                >/404</RouterLink
            >
        </nav>
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router';
</script>
