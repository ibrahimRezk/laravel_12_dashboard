<script setup lang="ts">
import { computed } from "vue";
import Th from "@/components/Table/Th.vue";
import Td from "@/components/Table/Td.vue";
import Pagination from "@/components/Table/Pagination.vue";
import Checkbox from "../Checkbox.vue";

// --- 1. Define Interfaces for Complex Props ---

// Structure for a single item in the 'headers' array
interface Header {
    label: string;
    name?: string;
    classes?: string;
    color?: string;
}

// Structure for the 'items' object (assuming Laravel/Inertia pagination)
interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Meta {
    links?: PaginationLink[];
    // Add other meta properties if needed (current_page, last_page, etc.)
    [key: string]: any; 
}

interface PaginatedItems {
    data?: Array<any>; // Array of row data objects
    meta?: Meta;
    [key: string]: any; // Allows for other top-level properties like 'links' if not using a 'meta' wrapper
}

// Interface for all component props
interface Props {
    headers: Header[];
    items: PaginatedItems | Array<any>; // Can be a Paginated object or a simple array
    headersClasses?: string;
    headerFooterClasses?: string;
    trClasses?: string;
    bodyClasses?: string;
    hoverClasses?: string;
    noCheckAll?: boolean;
    checkedAllButton?: boolean;
    noNamePadding?: boolean;
    withAxios?: boolean;
    noPagination?: boolean;
    has_extra_final_row?: boolean;
    showPaginationNumber?: boolean;
    tableHeight?: string;
}

// --- 2. Define Props with Defaults ---
const props = withDefaults(defineProps<Props>(), {
    headers: () => [],
    items: () => ({}),
    headersClasses: "",
    headerFooterClasses: "",
    trClasses: "",
    bodyClasses: "",
    hoverClasses: "",
    noCheckAll: false,
    checkedAllButton: false,
    noNamePadding: false,
    withAxios: false,
    noPagination: false,
    has_extra_final_row: false,
    showPaginationNumber: true,
    tableHeight: "",
});

// --- 3. Define Emits with Types ---

const emit = defineEmits<Emits>();

interface Emits {
    (e: "callAxiosUrl", payload: string | null): void;
    (e: "checkedAll"): void;
    (e: "startLeaveAnimation", value: boolean): void;
    // CRITICAL: Define the update event for v-model
    (e: "update:checkedAllButton", value: boolean): void;
}

// ... (props definition)

// Create a computed property for two-way binding
const checkedAllModel = computed({
    get() {
        // Returns the current value of the prop
        return props.checkedAllButton;
    },
    set(value: boolean) {
        // Emits the update event to the parent
        emit("update:checkedAllButton", value);
        // Also call the original @change handler logic if needed
        emit("checkedAll");
    },
});

// --- 4. Functions ---

const startLeaveAnimation = () => {
    emit("startLeaveAnimation", false);
};

const callAxiosUrl = (payload: string | null) => {
    emit("callAxiosUrl", payload);
    emit("startLeaveAnimation", false);
};

// Function for determining header text color based on index
const headerTextColor = (index: number): string => {
    switch (index % 16) {
        case 0:
        case 8:
        case 13:
            return "text-green-300";
        case 1:
        case 11:
            return "text-cyan-300";
        case 2:
        case 9:
        case 15:
            return "text-orange-300";
        case 3:
            return "text-red-300";
        case 4:
        case 10:
            return "text-indigo-300";
        case 5:
        case 12:
            return "text-pink-300";
        case 6:
        case 14:
            return "text-yellow-300";
        case 7:
            return "text-sky-300";
        default:
            return "text-gray-300";
    }
};

// --- 5. Computed Properties ---

const theHeadersClasses = computed(() => {
    return `rtl:bg-linear-to-r ltr:bg-linear-to-l rounded-2xl font-normal text-white from-gray-800 to-gray-700 dark:via-zinc-700 dark:from-black dark:to-black ${
        props.tableHeight === "" ? "border-y border-gray-200/40" : ""
    } ${props.headersClasses} `;
});

const theheaderFooterClasses = computed(() => {
    return `rtl:bg-linear-to-r ltr:bg-linear-to-l font-normal text-white from-zinc-800 via-orange-200 to-zinc-900 dark:via-zinc-900 to-zinc-900 ${
        props.headerFooterClasses
    } ${props.noPagination ? " " : "rounded-2xl "}`;
});

const theTrClasses = (index: number): string => {
    const baseClasses = props.trClasses;
    const hoverClasses =
        "rtl:hover:bg-linear-to-r ltr:hover:bg-linear-to-l rounded-none hover:dark:from-zinc-800 hover:dark:to-gray-600";

    const oddRowClasses =
        "rtl:bg-linear-to-r ltr:bg-linear-to-l from-orange-300 to-black dark:from-zinc-900 dark:via-gray-800 dark:to-zinc-900";
    const evenRowClasses =
        "rtl:bg-linear-to-r ltr:bg-linear-to-l from-orange-200 to-black/90 dark:from-zinc-800 dark:via-gray-700 dark:to-zinc-800";

    if (index % 2 === 0) {
        return `${oddRowClasses} ${hoverClasses} hover:from-orange-300/90 hover:to-black/80 ${baseClasses} `;
    } else {
        return `${evenRowClasses} ${hoverClasses} hover:from-orange-200/90 hover:to-black/80 ${baseClasses} `;
    }
};

// const theHoverClasses = computed(() => {
//     return `rtl:hover:bg-linear-to-r ltr:hover:bg-linear-to-l rounded-none hover:dark:from-zinc-600 hover:dark:to-gray-600 hover:from-amber-50 hover:to-gray-800 ${props.hoverClasses}`;
// });

// Helper to get the actual array of items (either from the root or the 'data' key)
const dataItems = computed(() => {
    if (props.noPagination && Array.isArray(props.items)) {
        return props.items;
    }
    // Type checking for objects that might contain a 'data' key
    if (!props.noPagination && typeof props.items === 'object' && props.items && 'data' in props.items && Array.isArray(props.items.data)) {
        return props.items.data;
    }
    return [];
});

const hasData = computed(() => {
    // Check if pagination is disabled and items is an array with length
    if (props.noPagination && Array.isArray(props.items)) {
        return props.items.length > 0;
    }
    // Check if pagination is enabled and items.data is an array with length
    if (!props.noPagination && typeof props.items === 'object' && props.items && 'data' in props.items && Array.isArray(props.items.data)) {
        return props.items.data.length > 0;
    }
    return false;
});
</script>

<template>
    <div class="flex flex-wrap">
        <div class="flex-none w-full max-w-full">
            <div
                class="flex flex-col min-w-0 wrap-break-words border-zinc-400/20 border border-solid shadow-black shadow-md bg-clip-border"
                :class="theheaderFooterClasses"
            >
                <div
                    class="z-10 px-5 borde border-b-0 border-b-solid rounded-t-2xl border-b-transparent rtl:bg-linear-to-r ltr:bg-linear-to-l rounded-none"
                >
                    <div
                        class="flex flex-row gap-2 text-yellow-50 text-lg py-2"
                    >
                        <slot name="title"> </slot>
                    </div>
                </div>

                <div class="flex-auto">
                    <div
                        class="grow overflow-auto tableheight"
                        :class="props.tableHeight"
                    >
                        <table
                            class="items-center w-full mb-3 align-top text-slate-500"
                        >
                            <thead
                                class="sticky top-0 z-10 align-bottom bg-gray-800"
                                :class="theHeadersClasses"
                            >
                                <Th
    v-if="!props.noCheckAll"
    class="border-b border-gray-300/50"
>
    <Checkbox
        class="rtl:mr-1.5 ltr:ml-1.5"
        v-model:checked="checkedAllModel"
        @change="$emit('checkedAll')"
    />
</Th>

                                <Th
                                    v-for="(header, index) in props.headers"
                                    :key="header.label"
                                    :class="`${header.classes} `"
                                    class="border-b border-gray-300/50"
                                >
                                    <span
                                        v-if="header.name === 'name' && !props.noNamePadding"
                                        class="mx-12 text-wrap"
                                        :class="`${props.headersClasses} ${
                                            header?.color
                                        } ${headerTextColor(index)}`"
                                    >
                                        {{ $t("general." + header.label + "") }}
                                    </span>
                                    <span
                                        v-else
                                        :class="`${props.headersClasses} ${
                                            header?.color
                                        } ${headerTextColor(index)}`"
                                        class="text-md text-wrap"
                                    >
                                        {{ $t("general." + header.label + "") }}
                                    </span>
                                </Th>
                            </thead>

                            <tbody>
                                <tr
                                    v-for="(item, index) in dataItems"
                                    :class="theTrClasses(index)"
                                    :key="index"
                                >
                                    <slot :item="item" :index="index"></slot>

                                    <slot
                                        name="item"
                                        :item="item"
                                        :index="1"
                                    ></slot>
                                </tr>

                                <tr v-if="!hasData">
                                    <Td :colspan="props.headers.length + 1">
                                        {{ $t("general.no data available") }}
                                    </Td>
                                </tr>

                                <tr v-if="props.has_extra_final_row">
                                    <slot name="finalRow" />
                                </tr>
                            </tbody>
                        </table>
                        
                        <div v-if="props.noPagination === false">
                            <div class="items-center justify-center flex py-2">
                                <Pagination
                                    @startLeaveAnimation="startLeaveAnimation"
                                    @callAxiosUrl="callAxiosUrl"
                                    :links="(props.items as PaginatedItems)?.meta?.links || (props.items as PaginatedItems)?.links"
                                    :withAxios="props.withAxios"
                                    :showPaginationNumber="props.showPaginationNumber"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.customtableheight {
    height: 75vh;
}
/* durations and timing functions - these are for the page transitions */
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