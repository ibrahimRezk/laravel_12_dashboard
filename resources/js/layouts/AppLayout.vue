<script setup lang="ts">
import AppLayout from '@/layouts/app/AppSidebarLayout.vue';
import type { BreadcrumbItemType } from '@/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
    header?: string
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
    header: () => '',
});
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs"  :header="header">
        <slot />
    </AppLayout>
</template>
