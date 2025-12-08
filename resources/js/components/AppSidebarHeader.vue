<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItemType } from '@/types';
import LangSwitcher from './LangSwitcher.vue';

withDefaults(
    defineProps<{
        breadcrumbs?: BreadcrumbItemType[];
        header?: string | number;
    }>(),
    {
        breadcrumbs: () => [],
    },
);
</script>

<template>
    <header>

    <div
        class="flex h-12 shrink-0 items-center gap-2 border-b border-sidebar-border/70 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4"
    >
        <div class="flex w-full justify-between gap-2">
            <div class="flex items-center gap-2">
                <SidebarTrigger class="-mx-1" />
                <template v-if="breadcrumbs && breadcrumbs.length > 0">
                    <Breadcrumbs :breadcrumbs="breadcrumbs" />
                </template>
            </div>
            <div>
                <LangSwitcher />
            </div>
        </div>
    </div>

    <div class="shadow" v-if="header">
        <div
            class="mx-auto flex justify-start from-zinc-950 via-zinc-950 to-zinc-950/20 px-2 py-2.5 text-3xl leading-tight font-bold text-white capitalize sm:px-6 lg:px-5 ltr:bg-linear-to-r rtl:bg-linear-to-l"
        >
           {{ header }}
        </div>
    </div>
        </header>

</template>
