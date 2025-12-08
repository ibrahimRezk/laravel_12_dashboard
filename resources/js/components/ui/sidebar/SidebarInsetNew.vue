<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <!-- <div 
    class="overflow-auto min-h-screen w-full h-full ease-soft-in-out relative transition-all duration-200 bg-orange-100/45 dark:bg-zinc-950  "
    >

        <div
        class="w-full h-full absolute top-0 left-0 bg-[url('/assets/img/noise.jpg')] bg-contain bg-center opacity-10  -z-100"
    />
    <div
        class="w-full h-full absolute top-0 left-0 bg-[url('/assets/img/grid.svg')] bg-contain bg-center opacity-90  dark:opacity-10  -z-100"
    /> -->
  <main
    :class="cn(
      'relative flex min-h-svh flex-1 flex-col  bg-background ',
      'peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 rtl:md:peer-data-[state=collapsed]:peer-data-[variant=inset]:mr-2 ltr:md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 rtl:md:peer-data-[variant=inset]:mr-0 ltr:md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow z-10 ',
      props.class, 
    )"
  >

  <div
  class="w-full h-full absolute top-0 left-0 bg-[url('/assets/img/noise.jpg')] bg-contain bg-center opacity-10  -z-20 "
/>
<div
  class="w-full h-full absolute top-0 left-0 bg-[url('/assets/img/grid.svg')] bg-contain bg-center opacity-25  dark:opacity-10  -z-20"
/>
  <slot /> 
  </main>
<!-- </div> -->
</template>
