<script setup lang="ts">
import Alert from '@/components/Alert.vue';
import AppContent from '@/components/AppContent.vue';
import AppShell from '@/components/AppShell.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import AppSidebarHeader from '@/components/AppSidebarHeader.vue';
import type { BreadcrumbItemType } from '@/types';
import type { messages } from '@/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
    flash?: messages;
    header?: string;
    subHeader?: string;
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
    messages: () => [],
    header: ()=> '',
    subHeader: ()=> ''
});
</script>

<template>
    <AppShell variant="sidebar">
        <Alert :messages/>
        <AppSidebar />
        <AppContent variant="sidebar" class="overflow-x-hidden">
            <AppSidebarHeader :breadcrumbs="breadcrumbs" :header="header" :subHeader="subHeader" />
            <slot />
        </AppContent>
    </AppShell>
</template>
