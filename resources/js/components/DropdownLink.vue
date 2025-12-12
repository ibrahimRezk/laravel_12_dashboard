<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    href: String,
    as: String,
});

const classes="flex  items-start justify-start w-full m-1  px-4 py-1 text-sm  rtl:text-right ltr:trxt-left leading-5 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-300/20   focus:outline-none focus:bg-zinc-100 transition duration-150 ease-in-out"
</script>

<template>
    <div class=" flex w-full h-full bg-zinc-200 dark:bg-background">
        <button v-if="props.as == 'button'" type="submit" :class="classes">
            <slot />
        </button>

        <a v-else-if="props.as =='a'"  :href="props.href"  :class="classes">
            <slot />
        </a>

        <Link v-else :href="props.href" :class="classes">
            <slot />
        </Link>
    </div>
</template>
