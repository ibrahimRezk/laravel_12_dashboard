<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { Head, useForm, Link } from "@inertiajs/vue3";
import { router } from "@inertiajs/vue3";
import useHeaders from "@/Composables/useHeaders.js";
import Layout from "@/Layouts/Authenticated.vue";
import BreadCrumbs from "@/Components/BreadCrumbs.vue";
import Container from "@/Components/Container.vue";
import Card from "@/Components/Card/Card.vue";
import Table from "@/Components/Table/Table.vue";
import Td from "@/Components/Table/Td.vue";
import Actions from "@/Components/Table/Actions.vue";
import Button from "@/Components/Button.vue";
import Modal from "@/Components/ConfirmationModal.vue";
import Label from "@/Components/Label.vue";
import Input from "@/Components/Input.vue";
import AddNew from "@/Components/AddNew.vue";
import CustomHeaderButton from "@/Components/CustomHeaderButton.vue";

import useDeleteItem from "@/Composables/useDeleteItem.js";
import useFilters from "@/Composables/useFilters.js";
import InputGroup from "@/Components/InputGroup.vue";

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    items: {
        type: Object,
        default: () => ({}),
    },
    headers: {
        type: Array,
        default: () => [],
    },
    filters: {
        type: Object,
        default: () => ({}),
    },
    routeResourceName: {
        type: String,
        required: true,
    },
    can: Object,
    breadcrumbs: {
        type: [Array, Object],
        default: [{}],
    },
});

const show = (id) => {
    router.get(route(`${props.routeResourceName}.show`, { id: id }));
};

const fireShowEdit = (item) => {
    return router.get(
        route(`${props.routeResourceName}.edit`, { id: item.id })
    );
};

///////////////////////filter headers/////////////////////////////////////////////////////
const { filterHeadersMethod, showColumnItems, finalHeaders, filteredHeaders } =
    useHeaders({
        dbHeaders: props.headers,
        headers: props.headers,
        prepairFilteredHeaders: props.headers,
    });

watch(
    () => filteredHeaders.value,
    () => filterHeadersMethod()
);

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const opened = ref(0);
const method = ref("");
const showScreenExeptSubmenu = ref(false);
const routeResourceName = ref(props.routeResourceName);
const editMode = ref(false);

const active = computed(() => {
    return trans("general.active");
});

const {
    close,
    deleteModal,
    itemToDelete,
    isDeleting,
    showDeleteModal,
    handleDeleteItem,
    deleteMultipleItems,
} = useDeleteItem({
    routeResourceName: props.routeResourceName,
});

const { filters, isLoading, isFilled, resetFilter } = useFilters({
    filters: props.filters,
    routeResourceName: props.routeResourceName,
    method: props.method,
});

const headersClasses = computed(() => {
    return " from-gray-800 to-gray-700 ";
});
const headerFooterClasses = computed(() => {
    return " from-zinc-800 via-orange-200  to-zinc-900 ";
});

const trClasses = computed(() => {
    return " from-orange-200 to-black  ";
});
const hoverClasses = computed(() => {
    return " from-amber-50 to-gray-800  ";
});

const activeColor = (item) => {
    return item.active == 1 ? "gradient_green" : "gradient_red";
};
const animate = ref(true);
const startLeaveAnimation = () => {
    animate.value = false;
};
</script>

<template>
    <Head :title="title" />

    <Layout>
        <template #breadcrumbs>
            <bread-crumbs :crumbs="breadcrumbs"></bread-crumbs>
        </template>

        <template #header>
            {{ $t("general." + title) }}
        </template>
        <Container :animate="animate">
            <AddNew :show="isFilled" @reset="resetFilter">
                <Button color="gradient_blue" v-if="can.create">
                    <Link :href="route(`${props.routeResourceName}.create`)">
                        {{ $t("general.add new role") }}
                    </Link>
                </Button>
                <!-- 
                <template #filters>
                    <Filters
                        v-model="filters"
                        :categories="props.categories"
                        :is-loading="isLoading"
                        no-padding
                    />
                </template> -->

                <!-- /////////////////////////////////////////custum headers /////////////////////////////////////////////////// -->
                <template #customHeaderButton>
                    <CustomHeaderButton>
                        <template #checkedItemHeader>
                            <div
                                v-for="(header, index) in props.headers"
                                :key="index"
                            >
                                <Label
                                    class="mx-1 mt-2 mb-2 rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-yellow-500 via-orange-600 to-red-900 px-2 py-1 rounded shadow-md border border-gray-300"
                                >
                                    <div class="flex justify-between">
                                        <div>
                                            <h1 class="text-gray-200">
                                                {{
                                                    $t("general." + header.name)
                                                }}
                                            </h1>
                                        </div>
                                        <div>
                                            <input
                                                class="rounded mx-1 border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                type="checkbox"
                                                :id="header[index]"
                                                :value="header"
                                                v-model="filteredHeaders"
                                            />
                                        </div>
                                    </div>
                                </Label>
                            </div>
                        </template>
                    </CustomHeaderButton>
                </template>
                <!-- //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
            </AddNew>

            <!-- <Card class=""> -->
            <Table
                @startLeaveAnimation="startLeaveAnimation"
                :headers="finalHeaders"
                :items="items"
                :headersClasses="headersClasses"
                :trClasses="trClasses"
                :hoverClasses="hoverClasses"
                :headerFooterClasses="headerFooterClasses"
                noCheckAll
                noNamePadding
                class="mt-2"
            >
                <template #title>
                    <div class="flex justify-start">
                        <span class="mt-2">
                            {{ $t("general.list_of") }}
                            {{ $t("general." + props.title) }}
                        </span>

                        <InputGroup
                            class="mx-3"
                            :placeholder="`${$t('general.search')}`"
                            v-model="filters.name"
                        />
                        <Button
                            v-show="filters?.name"
                            class="hover:cursor-pointer mx-1 mt-2"
                            small
                            color="transparent_red"
                        >
                            <span @click="resetFilter">{{
                                $t("general.reset filter")
                            }}</span>
                        </Button>
                    </div>
                </template>
                <template v-slot="{ item, index }">
                    <!-- //////////////////////////checked row item///////////////////////// -->

                    <!-- ///////////////////////////////////////////////////// -->
                    <Td light v-show="showColumnItems('#')">
                        {{ items.meta.from + index }}
                    </Td>

                    <Td light v-show="showColumnItems('name')">
                        <Button color="gradient_white" small class="">
                            {{ item.slug }}
                        </Button>
                    </Td>

                    <Td bold v-show="showColumnItems('created_at')">
                        <Button color="gradient_yellow" small>
                            {{ item.created_at_formatted }}
                        </Button>
                    </Td>

                    <Td v-show="showColumnItems('actions')">
                        <Actions
                            :edit-link="
                                route(`${routeResourceName}.edit`, {
                                    id: item.id,
                                })
                            "
                            :show-edit="item.can.edit"
                            :show-delete="item.can.delete"
                            @deleteClicked="showDeleteModal(item)"
                        />
                    </Td>
                </template>
            </Table>
            <!-- </Card> -->
        </Container>
    </Layout>

    <Modal :show="deleteModal" @close="close">
        <template #title>
            <span class="text-red-800">{{ $t("general.delete") }} : </span>
            {{
                deleteMultipleItems
                    ? $t("general.all_selected")
                    : itemToDelete[0].slug
            }}
        </template>
        <template #content>
            {{ $t("general.delete confirmation") }}
        </template>
        <template #footer>
            <Button
                @click="handleDeleteItem"
                :disabled="isDeleting"
                color="red"
            >
                <span class="px-6" v-if="isDeleting">{{
                    $t("general.deleting")
                }}</span>
                <span class="px-6" v-else>{{ $t("general.delete") }}</span>
            </Button>
        </template>
    </Modal>
</template>
