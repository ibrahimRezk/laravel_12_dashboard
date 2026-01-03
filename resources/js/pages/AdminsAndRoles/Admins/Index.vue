<script setup>
import Layout from "@/Layouts/Authenticated.vue";
import BreadCrumbs from "@/Components/BreadCrumbs.vue";
import Container from "@/Components/Container.vue";
import InputError from "@/Components/InputError.vue";
import Button from "@/Components/Button.vue";
import Card from "@/Components/Card/Card.vue";
import { Head, useForm } from "@inertiajs/vue3";
import { ref, computed, watch, onMounted } from "vue";
import CustomHeaderButton from "@/Components/CustomHeaderButton.vue";
import useHeaders from "@/Composables/useHeaders.js";
import Table from "@/Components/Table/Table.vue";
import Td from "@/Components/Table/Td.vue";
import Actions from "@/Components/Table/Actions.vue";
import Modal from "@/Components/ConfirmationModal.vue";
import useDialogModal from "@/Composables/useDialogModal.js";
import DialogModal from "@/Components/DialogModal.vue";
import Label from "@/Components/Label.vue";
import Input from "@/Components/Input.vue";
import AddNew from "@/Components/AddNew.vue";
import Filters from "./Filters.vue";
import useDeleteItem from "@/Composables/useDeleteItem.js";
import useFilters from "@/Composables/useFilters.js";
import CheckboxGroup from "@/Components/CheckboxGroup.vue";
import SelectGroup from "@/Components/SelectGroup.vue";
import InputGroup from "@/Components/InputGroup.vue";
import { trans } from "laravel-vue-i18n";
import { router } from "@inertiajs/vue3";

const props = defineProps({
    edit: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
    },
    items: {
        type: Object,
        default: () => {},
    },

    headers: {
        type: Array,
        default: () => [],
    },
    roles: {
        type: Array,
        default: () => [],
    },

    filters: {
        type: Object,
        default: () => ({}),
    },
    errors: {
        type: Object,
        default: () => {},
    },
    routeResourceName: {
        type: String,
        required: true,
    },
    method: String,
    can: Object,
    breadcrumbs: {
        type: [Array, Object],
        default: [{}],
    },
});

const show = (id) => {
    // router.get(route("admin_treasury.show", { id: id }));
    router.get(route(`${props.routeResourceName}.show`, { id: id }));
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

const form = useForm({
    name: {
        ar: "",
        en: "",
    },
    email: "",
    password: "",
    passwordConfirmation: "",
    active: true,
    roleId: "",
    phone: "",
});

const active = computed(() => {
    return form.active == true
        ? trans("general.active")
        : trans("general.inactive");
});

const emptyErrors = () => {
    Object.keys(props.errors).forEach((error) => (props.errors[error] = ""));
};

const fireshowDialogModal = () => {
    form.reset();
    // form.defaults() // to get previos data if accedintaly close modal
    editMode.value = false;
    emptyErrors();
    showDialogModal();
};
const fireShowEditModal = (item) => {
    form.reset();
    editMode.value = true;
    method.value = "update";
    emptyErrors();
    fillForm(item);
    showEditModal(item);
};

const fillForm = (item) => {
    Object.keys(form).forEach((key) => {
        item[key] !== undefined && key !== "name"
            ? (form[key] = item[key])
            : "";

        form.roleId = item.roles[0]?.id;

        if (item.profile) {
            item.profile[key] !== undefined
                ? (form[key] = item.profile[key])
                : "";
        }
    });
    form.name.ar = item["name.ar"];
    form.name.en = item["name.en"];
};

const yesClasses = computed(() => {
    return `bg-gradient-to-l from-yellow-800 to-yellow-500 hover:from-gray-900 hover:to-yellow-500 active:bg-yellow-900 focus:border-white focus:shadow-outline-yellow rtl:ml-1 ltr:mr-1  ${statusClass.value}`;
});

const noClasses = computed(() => {
    return `bg-gradient-to-l from-red-800 to-red-500 hover:from-gray-900 hover:to-red-500 active:bg-red-900 focus:border-white focus:shadow-outline-red  ltr:ml-1 rtl:mr-1 ${statusClass.value}`;
});

const statusClass = computed(() => {
    return "text-white font-normal  shadow-md  border-white text-shadow-none hover:scale-110 border border-transparent rounded-xl   capitalize tracking-wider focus:outline-none transition ease-in-out duration-150   rtl:pr-3 py-1   text-xs";
});

const addNewOrEdit = () => {
    return editMode.value == true ? editAdmin() : addNewAdmin();
};

const editAdmin = () => {
    editMode.value == true;
    method.value = "update";
    routeResourceName.value = `${props.routeResourceName}`;
    return handleSavingItem();
};

const addNewAdmin = () => {
    // console.log(props.routeResourceName)
    editMode.value == false;
    method.value = "store";
    routeResourceName.value = `${props.routeResourceName}`;
    return handleSavingItem();
};

const {
    closeDialogModal,
    dialogModal,
    itemToSave,
    isSaving,
    showDialogModal,
    showEditModal,
    handleSavingItem,
} = useDialogModal({
    routeResourceName: routeResourceName,
    form: form,
    opened,
    showScreenExeptSubmenu,
    method,
    editMode,
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

const checkedItems = ref([]);
const checkAllItems = () => {
    if (!checkedItems.value.length) {
        props.items.data.forEach((item) => {
            // props.items.data.forEach((item) => {
            if (item.can.delete == true) {
                checkedItems.value.push(item);
            }
        });
    } else {
        checkedItems.value = [];
    }
};
const checkedAllButton = ref(false);

// watch(() => checkedItems.value,
//     () => checkedItems.value.length > 0 ? checkedAllButton.value = true : checkedAllButton.value = false)

watch(
    () => checkedItems.value.length,
    () =>
        checkedItems.value.length > 0
            ? (checkedAllButton.value = true)
            : (checkedAllButton.value = false)
);

watch(
    () => deleteMultipleItems.value,
    () => (deleteMultipleItems.value == false ? (checkedItems.value = []) : "")
);

const deleteAll = () => {
    deleteMultipleItems.value = true;
    showDeleteModal(checkedItems.value);
};

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

const filtersValuesData = ref({});
const filtersValuesDataMethod = (data) => {
    filtersValuesData.value = data;
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
            <AddNew
                :show="isFilled"
                @reset="resetFilter"
                @deleteAll="deleteAll"
                :checkedItems="checkedItems.length"
                :showDeleteAll="can.delete"
            >
                <Button
                    color="gradient_blue"
                    v-if="can.create"
                    @click="fireshowDialogModal"
                >
                    {{ $t("general.add new system admin") }}
                </Button>

                <!-- /////////////////////////////////////////custum headers /////////////////////////////////////////////////// -->
                <template #customHeaderButton>
                    <CustomHeaderButton
                        :showTitle="false"
                        button_title="filter"
                        color="gradient_black"
                        width="60"
                        iconType="filter"
                    >
                        <Filters
                            v-model="filters"
                            @filtersValuesData="filtersValuesDataMethod"
                            :is-loading="isLoading"
                            no-padding
                        />
                    </CustomHeaderButton>
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
                @checkedAll="checkAllItems()"
                :checkedAllButton="checkedAllButton"
                noNamePadding
                class="mt-2"
            >
                <template #title>
                    <span
                        v-if="
                            Object.keys(props.filters).length == 0 ||
                            (Object.keys(props.filters).length == 1 &&
                                Object.keys(props.filters)[0] == 'page') ||
                            (Object.keys(props.filters).length == 1 &&
                                Object.keys(props.filters)[0] ==
                                    'paginationNumber') ||
                            (Object.keys(props.filters).length == 2 &&
                                (Object.keys(props.filters)[0] ==
                                    'paginationNumber' ||
                                    Object.keys(props.filters)[1] ==
                                        'paginationNumber'))
                        "
                    >
                        {{ $t("general.list_of") }}
                        {{ $t("general." + props.title) }}
                    </span>

                    <span v-else class=" ">
                        <span class="text-yellow-100 px-2 text-sm">
                            {{ $t("general.active filters") }} :
                        </span>
                        <!-- <span
                v-if="props.filters.store_ids"
            >
                {{ $t("general.list_of") }}
            </span> -->

                        <span class="flex flex-wrap">
                            <span v-for="(f, i) in filtersValuesData" :key="i">
                                <Button
                                    v-if="f.data"
                                    class="mx-1 flex justify-between mt-2 items-center"
                                    small
                                    color="transparent_yellow"
                                >
                                    {{ $t("general." + i) }} :
                                    <Button
                                        class="rtl:mr-1 ltr:ml-1 my-1 flex"
                                        small
                                        color="transparent_yellow"
                                    >
                                        <span>
                                            {{ f.data }}
                                        </span>
                                        <span
                                            class="rtl:mr-2 ltr:ml-2 text-xs my-1"
                                            @click="filters[f.id] = ''"
                                        >
                                            x
                                        </span>
                                    </Button>
                                </Button>
                            </span>
                            <Button
                                class="w-40 mx-1 mt-2 hover:cursor-pointer"
                                small
                                color="transparent_red"
                            >
                                <span @click="resetFilter">{{
                                    $t("general.reset filter")
                                }}</span>
                            </Button>
                        </span>
                    </span>
                </template>
                <template v-slot="{ item, index }">
                    <!-- //////////////////////////checked row item///////////////////////// -->
                    <Td light>
                        <input
                            v-if="item.can.delete"
                            class="rounded-sm mx-1 border-gray-300 text-yellow-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            type="checkbox"
                            :id="item.id"
                            :value="item"
                            v-model="checkedItems"
                        />
                    </Td>
                    <!-- ///////////////////////////////////////////////////// -->
                    <Td light v-show="showColumnItems('#')">
                        {{ items.meta.from + index }}
                    </Td>

                    <Td light v-show="showColumnItems('name')">
                        <Button color="gradient_white" small class="">
                            {{ item.name }}
                        </Button>
                    </Td>

                    <Td bold v-show="showColumnItems('active')">
                        <Button :color="activeColor(item)" small class="">
                            {{
                                item.active == 1
                                    ? $t("general.yes")
                                    : $t("general.no")
                            }}
                        </Button>
                    </Td>

                    <Td bold v-show="showColumnItems('phone')">
                        <Button color="gradient_white" small>
                            {{ item.profile?.phone ?? "--" }}
                        </Button>
                    </Td>

                    <Td bold v-show="showColumnItems('created_at')">
                        <Button color="gradient_yellow" small>
                            {{ item.created_at_formatted }}
                        </Button>

                        <!-- {{  new Date(item.created_at).toLocaleString() }} -->
                    </Td>
                    <Td bold v-show="showColumnItems('updated_at')">
                        <Button color="gradient_orange" small>
                            {{ item.updated_at_formatted }}
                        </Button>

                        <!-- {{  new Date(item.created_at).toLocaleString() }} -->
                    </Td>
                    <Td v-show="showColumnItems('actions')">
                        <Actions
                            :showEditModal="true"
                            :show-edit="item.can.edit"
                            :show-delete="item.can.delete"
                            @editClicked="fireShowEditModal(item)"
                            @deleteClicked="showDeleteModal(item)"
                        >
                            <template #icon v-if="props.can.view">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    class="w-4 h-4 text-blue-600 hover:cursor-pointer"
                                    @click="show(item.id)"
                                >
                                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                    <path
                                        fill-rule="evenodd"
                                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </template>
                            <!-- <template #button >  
                            <Button class=" rtl:ml-2 ltr:mr-2"  >
                                    {{ $t('general.special permissions') }}
                            </Button>

                        </template> -->
                        </Actions>
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
                    : itemToDelete[0].name
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

    <DialogModal :show="dialogModal" @close="closeDialogModal" maxWidth="5xl">
        <template #title>
            {{
                editMode == true
                    ? $t("general.edit system admin")
                    : $t("general.add new system admin")
            }}
        </template>

        <template #content>
            <form @submit.prevent="addNewOrEdit">
                <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup
                        class="mt-1 px-0"
                        label="name in arabic"
                        translationFolder="general."
                        v-model="form.name.ar"
                        :error-message="props.errors['name.ar']"
                    />
                    <InputGroup
                        class="mt-1 px-0"
                        label="name in english"
                        translationFolder="general."
                        v-model="form.name.en"
                        :error-message="props.errors['name.en']"
                    />

                    <InputGroup
                        class="mt-1 px-0"
                        label="email"
                        type="email"
                        translationFolder="general."
                        v-model="form.email"
                        :errorMessage="props.errors.email"
                    />

                    <InputGroup
                        class="mt-1 px-0"
                        label="phone"
                        type="text"
                        translationFolder="general."
                        v-model="form.phone"
                        :errorMessage="props.errors.phone"
                    />

                    <InputGroup
                        class="mt-1 px-0"
                        label="password"
                        type="password"
                        translationFolder="general."
                        v-model="form.password"
                        :errorMessage="props.errors.password"
                    />
                    <InputGroup
                        class="mt-1 px-0"
                        label="passwordConfirmation"
                        type="password"
                        translationFolder="general."
                        v-model="form.passwordConfirmation"
                        :errorMessage="props.errors.passwordConfirmation"
                    />

                    <SelectGroup
                        class="mt-1"
                        translationFolder="general."
                        label="role"
                        itemText="slug"
                        v-model="form.roleId"
                        :items="props.roles"
                        :error-message="props.errors?.roleId"
                    />
                    <div>
                        <span class="text-zinc-300 mx-5">{{
                            $t("general.active")
                        }}</span>
                        <label
                            class="xl:col-span-1 flex justify-start px-2 rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-transparent rounded-full shadow-md border border-zinc-300/40"
                            :class="
                                form.active == true
                                    ? 'to-sky-800'
                                    : 'to-red-800'
                            "
                        >
                            <div class="my-0.5">
                                <CheckboxGroup
                                    class=""
                                    :label="active"
                                    v-model:checked="form.active"
                                    :errorMessage="props.errors.active"
                                />
                            </div>
                        </label>
                    </div>
                </div>

                <div class="flex justify-center mt-4">
                    <button
                        :disabled="form.processing"
                        type="submit"
                        class="mb-2 px-12 py-1 rounded-full text-white bg-gradient-to-l from-orange-800 to-orange-500 hover:from-orange-900 hover:to-orange-500 border-orange-100 duration-300 capitalize tracking-wider ease-in-out hover:scale-110 shadow-black drop-shadow-2xl shadow-2xl border text-sm"
                    >
                        {{
                            form.processing
                                ? $t("general.saving")
                                : $t("general.save")
                        }}
                    </button>
                </div>

                <!-- /////////////////////////////////////////////////// -->
            </form>
        </template>
    </DialogModal>
</template>
