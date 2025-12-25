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

<style scoped>

/* durations and timing functions.*/
.page-enter-active,
.page-leave-active {
    transition: all 0.8s;
}

.page-enter-from {
    transform: translateY(40px);
    opacity: 0;
}

.page-leave-to {
    opacity: 0;
    transform: translateY(-70px);
}
</style>


