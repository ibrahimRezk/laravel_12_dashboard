<script setup lang="ts">
// import NavFooter from '@/components/NavFooter.vue';
// import NavUser from '@/components/NavUser.vue';
import NavMain from '@/components/NavMain.vue';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProps,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
// import { type NavItem } from '@/types';
// import { BookOpen, Folder, LayoutGrid } from 'lucide-vue-next';
import AppLogo from './AppLogo.vue';
import { Link, usePage } from '@inertiajs/vue3';
import { computed, onMounted } from 'vue';


// const mainNavItems: NavItem[] = [
//     {
//         title: 'Dashboard',
//         href: dashboard(),
//         icon: LayoutGrid,
//     },
// ];



import { storeToRefs } from 'pinia';
import { useGeneralStore } from '@/stores';
const useGeneral = useGeneralStore();
const { animate } = storeToRefs(useGeneral);
// const { paginationNumber } = storeToRefs(useGeneral);

onMounted(() => {
    animate.value = true;
});



const mainNavItems = usePage().props.menus;




// const footerNavItems: NavItem[] = [
//     {
//         title: 'Github Repo',
//         href: 'https://github.com/laravel/vue-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#vue',
//         icon: BookOpen,
//     },
// ];




const direction = computed(() => {
    const lang = document.getElementsByTagName('html')[0].getAttribute('lang');
    if (lang == 'ar') {
        document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
        return <SidebarProps['side']>'right';
    } else {
        document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
        return <SidebarProps['side']>'left';
    }
});
</script>

<template>
        <!-- <Sidebar collapsible="icon" variant="inset" :side="locale === 'ar' ? 'right' : 'left'"> -->

    <Sidebar collapsible="icon" variant="floating" :side="direction">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="dashboard()">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />

        </SidebarContent>

        <SidebarFooter>
            <!-- <NavFooter :items="footerNavItems" /> -->
            <!-- <NavUser /> -->
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
