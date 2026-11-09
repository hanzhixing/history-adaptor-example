<template>
    <div class="space-y-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div class="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Content Component
        </div>
        <p class="text-2xl font-bold text-slate-900">
            Now we are on page
            <span v-if="hashMode" class="font-mono text-slate-400">/#</span>
            <span class="break-all font-mono text-slate-700">{{ route.fullPath }}</span>
        </p>
    </div>
</template>

<script setup lang="ts">
import {inject} from 'vue';
import {useRoute} from 'vue-router';

const hashMode = inject('hashMode', false);
const route = useRoute();
</script>
