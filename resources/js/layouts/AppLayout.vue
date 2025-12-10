<script setup lang="ts">
import AppLayout from '@/layouts/app/AppSidebarLayout.vue';
import type { BreadcrumbItemType } from '@/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
    header?: string
    subHeader?: string
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
    header: () => '',
    subHeader: () => '',
});
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs"   :header="header" :subHeader="subHeader">
        <slot />
    </AppLayout>
</template>
