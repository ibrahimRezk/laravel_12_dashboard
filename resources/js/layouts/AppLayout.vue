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






// Source - https://stackoverflow.com/a
// Posted by Mark, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-25, License - CC BY-SA 4.0

//   const tabArray = vscode.window.tabGroups.all;
//   const firstGroupOfTabs: ReadonlyArray<vscode.Tab> = tabArray[0].tabs;
  
//   let firstTabUri: vscode.Uri;  
//   if (firstGroupOfTabs[0].input instanceof vscode.TabInputText) firstTabUri = firstGroupOfTabs[0].input.uri;
import * as vscode from 'vscode';

const tabArray = vscode.window.tabGroups.all;

console.log(tabArray)




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


