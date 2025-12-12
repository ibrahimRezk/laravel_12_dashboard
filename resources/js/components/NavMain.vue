<script setup lang="ts">
// import {
//     SidebarGroup,
//     SidebarGroupLabel,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
// } from '@/components/ui/sidebar';

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';

// import { urlIsActive } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/vue3';

import { onMounted, ref } from 'vue';

import { useGeneralStore } from '@/stores/general';
import { storeToRefs } from 'pinia';
const useGeneral = useGeneralStore();
const { animate } = storeToRefs(useGeneral);
const { paginationNumber } = storeToRefs(useGeneral);

defineProps<{
    items: NavItem[];
}>();




onMounted(() => {
    animate.value = true;
});

const startLeaveAnimation = () => {
    paginationNumber.value = usePage().props.paginationNumber; // very important   its prevent call the page twice if we switch to another page  . check this part to move it to another place
    animate.value = false;
};





const page = usePage();

const menus = ref<NavItem[]>(page.props.menus);

const slideActionName = ref<string>('');

const openCloseSubMenu = (activeMenu: NavItem) => {
    activeMenu.isActive = true;
    if (activeMenu.hasSubmenu) {
        activeMenu.open = !activeMenu.open;
        menus.value.forEach((menu: NavItem) => {
            slideActionName.value = 'accordion';
            if (menu.title !== activeMenu.title) {
                menu.open = false;
            }
        });
    }
};

onMounted(() => {
    menus.value.forEach((menu) => {
        if (menu.hasSubmenu) {
            menu.subMenus.forEach((submenu: NavItem) => {
                if (submenu.isActive) {
                    slideActionName.value = ''; // keep it empty to prevent animation on sidebar menu when clicking on the current page or filter on it
                    return (menu.open = true);
                    // return openCloseSubMenu(menu);
                }
            });
        }
    });
});

const start = (el: HTMLElement): undefined => {
    el.style.height = el.scrollHeight + 'px';
};

const end = (el: HTMLElement): undefined => {
    el.style.height = '';
};
</script>

<template>
    <perfectScrollbar>
        <SidebarMenu v-if="menus">
            <SidebarMenuItem v-for="item in items" :key="item.title">
                <div v-if="item.hasSubmenu">
                    <SidebarMenuButton
                        as-child
                        :is-active="item.isActive"
                        @click="openCloseSubMenu(item)"
                        class="hover:cursor-pointer"
                    >
                        <component :is="item.icon" />
                        <span>{{ item.title }}</span>
                    </SidebarMenuButton>

                    <transition
                        :name="slideActionName"
                        @enter="start"
                        @after-enter="end"
                        @before-leave="start"
                        @after-leave="end"
                    >
                        <div v-show="item.open" v-if="item?.subMenus?.length">
                            <SidebarMenuSub>
                                <SidebarMenuSubItem
                                    v-for="subItem in item.subMenus"
                                    :key="subItem.title"
                                >
                                    <SidebarMenuSubButton
                                        as-child
                                        :is-active="subItem.isActive"
                                        @click="startLeaveAnimation"
                                    >
                                        <Link :href="subItem.href">{{
                                            subItem.title
                                        }}</Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        </div>
                    </transition>
                </div>

                <div v-else>
                    <SidebarMenuButton as-child :is-active="item.isActive">
                        <Link :href="item.href" @click="startLeaveAnimation">
                            <component :is="item.icon" />
                            <span>{{ item.title }}</span>
                        </Link>
                    </SidebarMenuButton>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    </perfectScrollbar>
</template>
<style scoped>
.accordion-enter-active,
.accordion-leave-active {
    will-change: height, opacity;
    transition:
        height 0.5s ease-out,
        opacity 0.5s ease-out;
    overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
    height: 0px !important;
    opacity: 0px;
}


</style>
