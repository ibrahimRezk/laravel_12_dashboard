<script setup lang="ts">

import { Link, router , usePage } from '@inertiajs/vue3';
import { ref, watch } from 'vue';

import {  logout } from '@/routes';
import { LogOut } from 'lucide-vue-next';

import { edit as profileLink } from '@/routes/profile';

import { useInitials } from '@/composables/useInitials';


import { useGeneralStore } from '@/stores/general';
import { storeToRefs } from 'pinia';
const useGeneral = useGeneralStore();
const { animate } = storeToRefs(useGeneral);


const { getInitials } = useInitials();



const page = usePage();
const user = ref(page.props.auth.user);

watch(() => page.props.auth.user , ()=> user.value = page.props.auth.user)


const handleLogout = () => {
    router.flushAll();
};

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useHoverDropdown } from '@/composables/useHoverDropdown';




const ProfileMenu = useHoverDropdown();
const profileOpen = ProfileMenu.isOpen


</script>
<template>

            <DropdownMenu
                v-model:open="profileOpen"
                :modal="false"
            >
                <div class="  flex "
                    @mouseenter="ProfileMenu.handleEnter"
                    @mouseleave="ProfileMenu.handleLeave"
                >
                    <DropdownMenuTrigger as-child>
                        <span
                            class="inline-flex rounded-full justify-center align-middle transition hover:scale-110"
                        >
                            <button
                                type="button"
                               
                            >
                            <div v-if="user.avatar">
                            <img
                                alt="image"
                                :src=" user.avatar ? `/storage/${user.avatar}` : '' "
                                class="h-9 w-9 rounded-full  border border-gray-100/50 object-cover"
                            />
                            </div>
                            <div v-else  class="hover:inline-flex items-center flex justify-center rounded-full align-middle border border-transparent bg-white  h-9 w-9 text-sm font-medium text-gray-500 transition hover:text-gray-700 focus:outline-none">
                                {{ getInitials(user.name) }}
                            </div>
                            </button>
                        </span>
                    </DropdownMenuTrigger>
                </div>

                <DropdownMenuContent
                    class="w-36"
                    align="start"
                    :side-offset="0"
                >
                    <div
                        @mouseenter="ProfileMenu.handleEnter"
                        @mouseleave="ProfileMenu.handleLeave"
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Link
                                @click="animate = false"
                                    :href="profileLink()"
                                    as="button"
                                    class="mx-auto block text-sm  h-full w-full hover:cursor-pointer"
                                >
                                    settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <div
                                    class="border-t border-gray-100 dark:border-gray-200/10"
                                />
                                <Link
                                    class="flex w-full items-center   h-full  hover:cursor-pointer"
                                    :href="logout()"
                                    @click="handleLogout"
                                    as="button"
                                    data-test="logout-button"
                                >
                                    <LogOut class="mr-2 h-4 w-4" />
                                    <span> Log out</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>

</template>
