<script setup lang="ts">
import { router } from '@inertiajs/vue3';
// import SelectGroup from "@/components/SelectGroup.vue";
import { usePage } from '@inertiajs/vue3';
import { onMounted, ref, watch } from 'vue';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useGeneralStore } from '@/stores';
import { storeToRefs } from 'pinia';
const useGeneral = useGeneralStore();
const { paginationNumber } = storeToRefs(useGeneral);

defineProps({
    links: Array,
    simpleLinks: Array,

    withAxios: {
        type: Boolean,
        default: false,
    },
    showPaginationNumber: {
        type: Boolean,
        default: true,
    },
});

const searchParams = new URLSearchParams(window.location.search);
const urlLink = ref({ url: window.location.href.split('?')[0] });

// const paginationNumber = ref(
//     searchParams.get("paginationNumber") ??
//         sessionStorage.getItem("paginationNumber") ??
//         usePage().props.paginationNumber
// );

// onMounted(() => {
//     sessionStorage.removeItem("paginationNumber");
// });

const emit = defineEmits(['startLeaveAnimation']);

function goToUrl(link) {
    if (
        usePage().props.paginationNumber == paginationNumber.value &&
        !searchParams.has('paginationNumber')
    ) {
        router.get(link.url);
    } else {
        router.get(link.url, { paginationNumber: paginationNumber.value });
    }

    emit('startLeaveAnimation');
}

onMounted(() =>
    !searchParams.has('paginationNumber')
        ? (paginationNumber.value = usePage().props.paginationNumber)
        : '',
);

// function goToUrl(link) {
//     sessionStorage.setItem("paginationNumber", paginationNumber.value);

//     if (
//         usePage().props.paginationNumber == paginationNumber.value &&
//         !searchParams.has("paginationNumber")
//     ) {
//         router.get(link.url);
//     } else {
//         router.get(link.url, { paginationNumber: paginationNumber.value });
//     }
//     emit("startLeaveAnimation");
// }

watch(
    () => paginationNumber.value,
    () => goToUrl(urlLink.value),
);

// watch(
//     () => paginationNumber.value,
//     () => paginationNumber.value !== usePage().props.paginationNumber ?  goToUrl(urlLink.value) : ''
// );

function isDisabled(link) {
    return link.url == null || link.active;
}

const link = (label) => {
    return label;
    // return label.includes(previous) ? 'السابق' : label
};
</script>

<template>
    <!-- <div class="flex justify-center"> -->
    <nav aria-label="Page navigation example" class="grid w-full grid-cols-10">
        <div v-if="withAxios" />
        <div v-else class="px-5">
            <!-- <SelectGroup
                v-if="showPaginationNumber"
                v-model="paginationNumber"
                :items="[
                    { id: 10, name: 10 },
                    { id: 20, name: 20 },
                    { id: 30, name: 30 },
                    { id: 40, name: 40 },
                    { id: 50, name: 50 },
                    { id: 100, name: 100 },
                ]"
            /> -->

            <Select v-if="showPaginationNumber" v-model="paginationNumber">
                <SelectTrigger class="h-8 w-20">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent class="min-w-20">
                    <SelectGroup>
                        <SelectLabel
                            class="flex items-center justify-center px-0"
                            >select</SelectLabel
                        >
                        <SelectItem value="10"> 10 </SelectItem>
                        <SelectItem value="20"> 20</SelectItem>
                        <SelectItem value="30"> 30 </SelectItem>
                        <SelectItem value="40"> 40 </SelectItem>
                        <SelectItem value="50"> 50 </SelectItem>
                        <SelectItem value="100"> 100 </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>

        <div class="col-span-8 flex justify-center py-0.5">
            <ul
                class="list-style-none col-span-8 flex rounded-full border border-zinc-500 dark:border-zinc-400/70"
            >
                <!-- links for small screens show only previos and next  -->
                <li
                    class="page-item flex-nowrap rounded-sm md:hidden"
                    v-for="link in links"
                    :key="link.label"
                    v-show="link.label.includes('&')"
                >
                    <span v-if="link.label.includes('&')">
                        <button
                            v-if="withAxios"
                            class="page-link relative block bg-transparent px-3 py-1.5 transition-all duration-300 outline-none hover:bg-gray-200 hover:text-gray-800 focus:shadow-none md:hidden"
                            :class="{
                                'text-gray-400': isDisabled(link),
                                'font-bold text-gray-900 dark:font-normal dark:text-gray-400/70':
                                    !isDisabled(link),
                                'bg-zinc-800 font-normal text-gray-100 dark:bg-zinc-700':
                                    link.active,
                            }"
                            v-html="link.label"
                            @click.prevent="$emit('callAxiosUrl', link)"
                            :disabled="isDisabled(link)"
                        ></button>

                        <button
                            v-else
                            class="page-link relative block bg-transparent px-3 py-1.5 transition-all duration-300 outline-none hover:bg-gray-200 hover:text-gray-800 focus:shadow-none md:hidden"
                            :class="{
                                'text-gray-400': isDisabled(link),
                                'font-bold text-gray-900 dark:font-normal dark:text-gray-400/70':
                                    !isDisabled(link),
                                'bg-zinc-800 font-normal text-gray-100 dark:bg-zinc-700':
                                    link.active,
                            }"
                            v-html="link.label"
                            @click.prevent="goToUrl(link)"
                            :disabled="isDisabled(link)"
                        ></button>
                    </span>
                </li>

                <!-- links for big screens show all pagination items  -->
                <li
                    class="page-item hidden flex-nowrap rounded-sm md:block"
                    v-for="link in links"
                    :key="link.label"
                >
                    <button
                        v-if="withAxios"
                        class="page-link relative border-zinc-400 bg-transparent px-3 py-1.5 transition-all duration-300 outline-none hover:bg-zinc-500 hover:text-gray-800 focus:shadow-none dark:border-zinc-400/40"
                        :class="{
                            'hover:ltr:rounded-l-full hover:rtl:rounded-r-full':
                                link.label.includes('Previous'),
                            'hover:ltr:rounded-r-full hover:rtl:rounded-l-full':
                                link.label.includes('Next'),
                            'ltr:border-l rtl:border-r':
                                !link.label.includes('Previous'),
                            'text-gray-400': isDisabled(link),
                            'font-bold text-gray-900 dark:font-normal dark:text-gray-400/70':
                                !isDisabled(link),
                            'bg-zinc-800 font-normal text-gray-50 dark:bg-zinc-500':
                                link.active,
                        }"
                        @click.prevent="$emit('callAxiosUrl', link)"
                        :disabled="isDisabled(link)"
                    >
                        {{
                            link.label.includes('Previous') ||
                            link.label.includes('Next')
                                ? $t('general.' + link.label)
                                : link.label
                        }}
                    </button>

                    <button
                        v-else
                        class="page-link relative border-zinc-400 bg-transparent px-3 py-1.5 transition-all duration-300 outline-none hover:bg-zinc-500 hover:text-gray-800 focus:shadow-none dark:border-zinc-400/40"
                        :class="{
                            'hover:ltr:rounded-l-full hover:rtl:rounded-r-full':
                                link.label.includes('Previous'),
                            'hover:ltr:rounded-r-full hover:rtl:rounded-l-full':
                                link.label.includes('Next'),
                            'ltr:border-l rtl:border-r':
                                !link.label.includes('Previous'),
                            'text-gray-400': isDisabled(link),
                            'font-bold text-gray-900 dark:font-normal dark:text-gray-400/70':
                                !isDisabled(link),
                            'bg-zinc-800 font-normal text-gray-100 dark:bg-zinc-700':
                                link.active,
                        }"
                        @click.prevent="goToUrl(link)"
                        :disabled="isDisabled(link)"
                    >
                        {{
                            link.label.includes('Previous') ||
                            link.label.includes('Next')
                                ? $t('general.' + link.label)
                                : link.label
                        }}
                    </button>
                </li>
            </ul>
        </div>
    </nav>
</template>
<!-- @click.prevent="goToUrl(link)" -->
