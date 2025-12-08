
<script setup lang="ts">
// import { loadLanguageAsync , getActiveLanguage} from "laravel-vue-i18n";
import { lang } from '@/routes';
import { Form, router } from '@inertiajs/vue3';
import { loadLanguageAsync } from 'laravel-vue-i18n';
import { onMounted, ref, computed, watch, nextTick } from "vue";
import Dropdown from '@/Components/Dropdown.vue';

import { edit as profileLink } from '@/routes/profile';
import { logout } from '@/routes';
import { LogOut } from 'lucide-vue-next';

import TextLink from '@/components/TextLink.vue';
import { useInitials } from '@/composables/useInitials';


import AppLogoIcon from '@/components/AppLogoIcon.vue';

const { getInitials } = useInitials();


const direction = computed(() => {
    if (document.getElementsByTagName("html")[0].getAttribute("lang") == "en")
        return "left";
    else return "right";
});

const current_lang = document
    .getElementsByTagName("html")[0]
    .getAttribute("lang");


type Theme = 'dark' | 'light' | 'system';

const mode = ref<Theme>('system') ; 

const switchMode = (value: Theme) => {
    if (value === 'dark') {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        mode.value = 'dark';
    } 
    else if (value === 'light') {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        mode.value = 'light';
    } 
    else {
        // Handle 'system' or any other value
        localStorage.removeItem('theme');
        mode.value = 'system';
        
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
};

const loadLanguage = async (selectedLang: string) => {
    await loadLanguageAsync(selectedLang);
    document.getElementsByTagName('html')[0].setAttribute('lang', selectedLang);

    router.get(lang(selectedLang));
    // router.get(route("lang", [selectedLang]));
};



//////////////////////////////////////////////////////////////////////////////////////////////

// import { useGeneralStore } from "@/stores/general";
// import { storeToRefs } from "pinia";
// const useGeneral = useGeneralStore();
// const { smallSideBar } = storeToRefs(useGeneral);
// const { paginationNumber } = storeToRefs(useGeneral);

const animate = ref<boolean>(false);

onMounted(() => {
    animate.value = true;
});

const startLeaveAnimation = () => {
    // paginationNumber.value = usePage().props.paginationNumber; // very important   its prevent call the page twice if we switch to another page
    animate.value = false;
};

//////////////////////////////////////////////////////////////////////////


const handleLogout = () => {
    router.flushAll();
};




</script>
<template>
    <div
    class="mt-2 flex grow items-center sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto"
    >

        <ul
            class="max:w-full mx-2 flex flex-row justify-between rounded-full border border-zinc-800 bg-linear-to-r from-zinc-900 to-zinc-900 dark:border-zinc-600"
        >
            <button
                :title="`${$t('general.switch to light mode')}`"
                v-show="mode == 'system'"
                @click="switchMode('light')"
                class="flex truncate rounded-full border border-zinc-700 bg-zinc-900 p-2 text-sm text-zinc-300 transition duration-400 ease-in-out hover:scale-110 dark:border-zinc-700"
            > 
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="h-5 w-5"
                >
                    <path
                        fill-rule="evenodd"
                        d="M2 4.25A2.25 2.25 0 0 1 4.25 2h11.5A2.25 2.25 0 0 1 18 4.25v8.5A2.25 2.25 0 0 1 15.75 15h-3.105a3.501 3.501 0 0 0 1.1 1.677A.75.75 0 0 1 13.26 18H6.74a.75.75 0 0 1-.484-1.323A3.501 3.501 0 0 0 7.355 15H4.25A2.25 2.25 0 0 1 2 12.75v-8.5Zm1.5 0a.75.75 0 0 1 .75-.75h11.5a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75H4.25a.75.75 0 0 1-.75-.75v-7.5Z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
            <button
                :title="`${$t('general.switch to dark mode')}`"
                v-show="mode == 'light'"
                @click="switchMode('dark')"
                class="flex truncate rounded-full border border-zinc-700 bg-zinc-900 p-2 text-sm text-zinc-300 transition duration-400 ease-in-out hover:scale-110 dark:border-zinc-700"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-5 w-5 text-white"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                </svg>
            </button>
            <button
                :title="`${$t('general.switch to system theme')}`"
                v-show="mode == 'dark'"
                @click="switchMode('system')"
                class="flex truncate rounded-full border border-zinc-700 bg-zinc-900 p-2 text-sm text-zinc-300 transition duration-400 ease-in-out hover:scale-110 dark:border-zinc-700"
            >
                <svg
                    viewBox="0 0 15 15"
                    width="1.2em"
                    height="1.2em"
                    class="h-5 w-[20px] text-foreground"
                >
                    <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M2.9.5a.4.4 0 0 0-.8 0v.6h-.6a.4.4 0 1 0 0 .8h.6v.6a.4.4 0 1 0 .8 0v-.6h.6a.4.4 0 0 0 0-.8h-.6zm3 3a.4.4 0 1 0-.8 0v.6h-.6a.4.4 0 1 0 0 .8h.6v.6a.4.4 0 1 0 .8 0v-.6h.6a.4.4 0 0 0 0-.8h-.6zm-4 3a.4.4 0 1 0-.8 0v.6H.5a.4.4 0 1 0 0 .8h.6v.6a.4.4 0 0 0 .8 0v-.6h.6a.4.4 0 0 0 0-.8h-.6zM8.544.982l-.298-.04c-.213-.024-.34.224-.217.4A6.57 6.57 0 0 1 9.203 5.1a6.602 6.602 0 0 1-6.243 6.59c-.214.012-.333.264-.183.417a6.8 6.8 0 0 0 .21.206l.072.066l.26.226l.188.148l.121.09l.187.131l.176.115c.12.076.244.149.37.217l.264.135l.26.12l.303.122l.244.086a6.568 6.568 0 0 0 1.103.26l.317.04l.267.02a6.6 6.6 0 0 0 6.943-7.328l-.037-.277a6.557 6.557 0 0 0-.384-1.415l-.113-.268l-.077-.166l-.074-.148a6.602 6.602 0 0 0-.546-.883l-.153-.2l-.199-.24l-.163-.18l-.12-.124l-.16-.158l-.223-.2l-.32-.26l-.245-.177l-.292-.19l-.321-.186l-.328-.165l-.113-.052l-.24-.101l-.276-.104l-.252-.082l-.325-.09l-.265-.06zm1.86 4.318a7.578 7.578 0 0 0-.572-2.894a5.601 5.601 0 1 1-4.748 10.146a7.61 7.61 0 0 0 3.66-2.51a.749.749 0 0 0 1.355-.442a.75.75 0 0 0-.584-.732c.062-.116.122-.235.178-.355A1.25 1.25 0 1 0 10.35 6.2c.034-.295.052-.595.052-.9"
                        clip-rule="evenodd"
                    ></path>
                </svg>
            </button>

            <!-- <li
                                class="relative flex items-center dropdown-notifications show rtl:mr-1 ltr:mx-1"
                            >
                                <div class="sm:flex sm:items-center">
                                    <div class="relative">
                                        <Dropdown
                                            :align="direction"
                                            :open="open"
                                            width="60"
                                        >
                                            <template #trigger>
                                                <button
                                                    class="text-yellow-300 font-normal flex hover:scale-110 border border-zinc-700 text-sm bg-zinc-900 rtl:rounded-l-full rounded-full focus:outline-none focus:border-gray-900 transition"
                                                    small
                                                >
                                                    <span
                                                        class="inline-flex rounded-md"
                                                    >
                                                        <button
                                                            type="button"
                                                            class="inline-flex items-center px-2 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-transparent hover:text-gray-700 focus:outline-none transition"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                class="h-4 w-4 text-yellow-300 font-normal"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <div>
                                                            <h1
                                                                v-show="
                                                                    notificationsCount >
                                                                    0
                                                                "
                                                                class="block px-2 py-0 my-2 text-xs text-gray-100 bg-red-600 rounded-full border border-white border-opacity-50"
                                                                id="notifications-count"
                                                            >
                                                                {{
                                                                    notificationsCount
                                                                }}
                                                            </h1>
                                                        </div>
                                                    </span>
                                                </button>
                                            </template>

                                            <template #content>
                                                <div
                                                    class="flex justify-between"
                                                >
                                                    <div
                                                        class="block px-4 py-2 text-xs text-gray-400"
                                                    >
                                                        {{
                                                            $t(
                                                                "general.notifications"
                                                            )
                                                        }}
                                                    </div>
                                                </div>
                                                <div
                                                    class="border-t border-gray-200"
                                                />

                                                <DropdownLink
                                                    class="new_message"
                                                    v-for="(
                                                        item, index
                                                    ) in items"
                                                    :key="index"
                                                    v-show="showNewMessage"
                                                >
                                                    <div class="flex py-1">
                                                        <div
                                                            class="my-auto rtl:ml-2 ltr:mr-2"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                class="w-10 h-10"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z"
                                                                    clip-rule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </DropdownLink>
                                                <DropdownLink
                                                    v-for="(
                                                        item, index
                                                    ) in notifications"
                                                    :key="index"
                                                >
                                                    <div class="flex py-1">
                                                        <div
                                                            class="my-auto rtl:ml-2 ltr:mr-2"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                class="w-10 h-10"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z"
                                                                    clip-rule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </DropdownLink>

                                                <div
                                                    class="border-t border-gray-100"
                                                />

                                                <div
                                                    class="border-t border-gray-100"
                                                />
                                            </template>
                                        </Dropdown>
                                    </div>
                                </div>
                            </li> -->

            <li class="relative flex items-center border rounded-full">
                <div class="mx-1 sm:flex sm:items-center">
                    <div class="relative">
                        <Dropdown :align="direction">
                            <template #trigger>
                                <Button
                                    color="gradient_black"
                                    class="rounded-full border-zinc-700 font-normal text-yellow-300 transition hover:scale-105"
                                    small
                                >
                                    <span class="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            class="inline-flex items-center border border-transparent bg-transparent px-3 py-2 text-sm leading-4 font-medium text-gray-500 transition hover:text-gray-700 focus:outline-none"
                                        >
                                            <svg
                                                class="-mr-0.5 h-4 w-4 ltr:mr-2 rtl:ml-2"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                            <span
                                                class="flex justify-between"
                                                v-if="current_lang == 'en'"
                                            >
                                                <img
                                                    src="../../../public/assets/img/us-flag-icon.jpg"
                                                    class="text-size-sm inline-flex h-4 w-full max-w-none items-center justify-center border border-white text-white ltr:mr-4 rtl:ml-4"
                                                    alt="us-flag-icon"
                                                />
                                                <span class="text-yellow-300">
                                                    English
                                                </span>
                                            </span>

                                            <span
                                                class="flex justify-between"
                                                v-if="current_lang == 'ar'"
                                            >
                                                <img
                                                    src="../../../public/assets/img/sa-flag-icon.jpg"
                                                    class="text-size-sm inline-flex h-4 w-full max-w-none items-center justify-center border border-white text-white ltr:mr-4 rtl:ml-4"
                                                    class1=" rounded-xl"
                                                    alt="sa-flag-icon"
                                                />
                                                <span class="text-yellow-300"
                                                    >العربية</span
                                                >
                                            </span>
                                        </button>
                                    </span>
                                </Button>
                            </template>

                            <template #content>
                                <div
                                    class="block px-4 py-2 text-xs text-gray-400"
                                >
                                    {{ $t('general.languages') }}
                                </div>
                                <div
                                    class="border-t border-gray-400 dark:border-gray-200/20"
                                />
                                <DropdownLink
                                    as="button"
                                    @click="loadLanguage('ar')"
                                >
                                    <div class="flex py-1">
                                        <div class="my-auto">
                                            <img
                                                alt="image"
                                                src="../../../public/assets/img/sa-flag-icon.jpg"
                                                class="text-size-sm inline-flex h-5 w-9 items-center justify-center text-white ltr:mr-4 rtl:ml-4"
                                            />
                                        </div>
                                        <div
                                            class="flex flex-col justify-center"
                                        >
                                            <span
                                                class="text-size-sm mb-1 leading-normal font-normal"
                                                >العربية</span
                                            >
                                        </div>
                                    </div>
                                </DropdownLink>

                                <DropdownLink
                                    class="border-t border-gray-200 dark:border-gray-200/10"
                                    as="button"
                                    @click="loadLanguage('en')"
                                >
                                    <div class="flex py-1">
                                        <div class="my-auto">
                                            <img
                                                alt="image"
                                                src="../../../public/assets/img/us-flag-icon.jpg"
                                                class="text-size-sm inline-flex h-5 w-9 max-w-none items-center justify-center text-white ltr:mr-4 rtl:ml-4"
                                            />
                                        </div>
                                        <div
                                            class="flex flex-col justify-center"
                                        >
                                            <span
                                                class="text-size-sm mb-1 leading-normal font-normal"
                                                >English</span
                                            >
                                        </div>
                                    </div>
                                </DropdownLink>
                            </template>
                        </Dropdown>
                    </div>
                </div>
            </li>

            <li class="relative flex items-center">
                <div class="relative">
                    <Dropdown :align="direction" width="48">
                        <template #trigger>
                            

                            <span class="inline-flex rounded-full transition hover:scale-110">
                                <button
                                    type="button"
                                    class="inline-flex items-center  border border-transparent bg-white px-3 hover: py-2 text-sm  font-medium text-gray-500 transition hover:text-gray-700 focus:outline-none rounded-full"
                                >
                                    {{ getInitials($page.props?.auth?.user?.name) }}

                               
                                </button>
                            </span>
                        </template>

                        <template #content>
                            <div class="block px-4 py-2 text-xs text-gray-400">
                                {{ $t('general.manage account') }}
                            </div>
                            <div
                                class="border-t border-gray-200 dark:border-gray-200/20"
                            />

                        


                            
                            <TextLink
                            :href="profileLink()"
                            as="button"
                            class="mx-auto block text-sm"
                            >
                            profile
                        </TextLink>
                        <div
                            class="border-t border-gray-100 dark:border-gray-200/10"
                        />
                            <TextLink
                :href="logout()"
                as="button"
                class="mx-auto block text-sm"
            >
                Log out
            </TextLink>
                        </template>
                    </Dropdown>
                </div>
            </li>
            <!-- <li class="relative flex items-center">
                <div class="relative">
                    <Dropdown :align="direction" width="48">
                        <template #trigger>
                            <button
                                v-if="
                                    $page.props.jetstream.managesProfilePhotos
                                "
                                class="flex rounded-full border border-zinc-700 text-sm transition hover:scale-110 focus:border-gray-900 focus:outline-none rtl:rounded-l-full"
                            >
                                <img
                                    class="h-8 w-8 rounded-full object-cover"
                                    :src="
                                        $page.props.auth.user.profile_photo_url
                                    "
                                    :alt="$page.props.auth.user?.name"
                                />
                            </button>

                            <span v-else class="inline-flex rounded-md">
                                <button
                                    type="button"
                                    class="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm leading-4 font-medium text-gray-500 transition hover:text-gray-700 focus:outline-none"
                                >
                                    {{ $page.props.user?.name }}

                                    <svg
                                        class="-mr-0.5 ml-2 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </template>

                        <template #content>
                            <div class="block px-4 py-2 text-xs text-gray-400">
                                {{ $t('general.manage account') }}
                            </div>
                            <div
                                class="border-t border-gray-200 dark:border-gray-200/20"
                            />

                            <DropdownLink
                                :href="profileLink"
                                @click="startLeaveAnimation"
                            >
                                {{ $t('general.profile') }}
                            </DropdownLink>

                            <DropdownLink
                                v-if="$page.props.jetstream.hasApiFeatures"
                                :href="route('api-tokens.index')"
                            >
                                API Tokens
                            </DropdownLink>

                            <div
                                class="border-t border-gray-100 dark:border-gray-200/10"
                            />

                            <form @submit.prevent="logout" method="post">
                                <DropdownLink as="button">
                                    {{ $t('general.sign out') }}
                                </DropdownLink>
                            </form>
                        </template>
                    </Dropdown>
                </div>
            </li> -->
        </ul>
    </div>
</template>

