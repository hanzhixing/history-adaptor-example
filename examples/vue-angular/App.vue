<template>
    <div data-host class="space-y-4">
        <RouterView />

        <section class="space-y-3 rounded-xl border-2 border-dashed border-violet-400 p-4">
            <p class="text-xs font-semibold uppercase tracking-widest text-violet-600">
                Nested Angular app (memory router)
            </p>
            <div id="angular-root"></div>
        </section>
    </div>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router';
</script>
