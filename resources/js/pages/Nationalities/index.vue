<script setup lang="ts">
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import  NationalityController  from '@/actions/App/Http/Controllers/NationalityController';

import { send } from '@/routes/verification';
import { Form, Head, Link, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import HeadingSmall from '@/components/HeadingSmall.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/AppLayout.vue';
import Filters from "./Filters.vue";
import { type BreadcrumbItem } from '@/types';
import AddNew from '@/components/AddNew.vue';
// import CustomHeaderButton from "@/Components/CustomHeaderButton.vue";
import Container from '@/components/Container.vue';
import Table from "@/Components/Table/Table.vue";
import Td from "@/Components/Table/Td.vue";
import Actions from "@/Components/Table/Actions.vue";
import Modal from "@/Components/ConfirmationModal.vue";
import DialogModal from "@/Components/DialogModal.vue";
import { Label } from '@/components/ui/label';
// import Label from "@/Components/Label.vue";
import CheckboxGroup from '@/Components/CheckboxGroup.vue';

import Checkbox from '@/Components/Checkbox.vue';
import useHeaders from "@/Composables/useHeaders.js";
import useFilters from "@/Composables/useFilters.js";
import useDeleteItem from "@/Composables/useDeleteItem.js";
import useDialogModal from "@/Composables/useDialogModal.js";
import CustomHeaderButton from '@/Components/CustomHeaderButton.vue';

import { watch } from 'vue';

interface header {
    name: string;
    title: string;
}


interface meta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

interface links {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

interface itemsData {
    data: object[] ;
    links: links;
    meta: meta;
}
interface permissions {
    create: boolean;
    update: boolean;
    delete: boolean;
}

interface Props {
    edit?: boolean;
    title?: string;
    routeResourceName?: string;
    items?: itemsData; // Assuming 'items' is an array of objects
    headers?: header[];
    filters?: Record<string, any>;
    errors?: Record<string, any>;
    method?: string;
    can?: permissions;
}


const props = withDefaults(defineProps<Props>(), {
    edit: false,
    title: '',
    routeResourceName: '',
    headers: () => [], 
    items:  () => ({
        data: [],
        links: {
            first: '',
            last: '',
            prev: null,
            next: null,
        }
        ,
        meta: {
            current_page: 1,
            from: 1,
            last_page: 1,
            per_page: 10,
            to: 1,
            total: 0,
        },
    }),
    filters: () => ({}),
    errors: () => ({}),
    can: () => ({
        create: false,
        update: false,
        delete: false,
    }),
    method: '',
});



const breadcrumb: BreadcrumbItem[] = [
    {
        title: props.title,
        href: NationalityController.index(),
    },
];






const opened = ref(0);
const method = ref("");
const showScreenExeptSubmenu = ref(false);
const routeResourceName = ref(props.routeResourceName);
const editMode = ref(false);


const emptyErrors = () => {
    Object.keys(props.errors).forEach((error) => (props.errors[error] = ""));
};




const fireshowDialogModal = () => {
    editMode.value = false;
    emptyErrors();
    showDialogModal();
};

interface NationalityForm {
    name: {
        ar: string;
        en: string;
    };
    active: boolean;
}
const currentItem = ref<NationalityForm>({
    name: {
        ar: '',
        en: '',
    },
    active: false,
});

const fireShowEditModal = (item: object) => {
    // form.reset();
    editMode.value = true;
    method.value = "update";
    emptyErrors();
    currentItem.value = item as NationalityForm;
    // fillForm(item);
    showEditModal(item);
};


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


const { filters, isLoading, isFilled, resetFilter } = useFilters({
    filters: props.filters,
    routeResourceName: props.routeResourceName,
    method: props.method,
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



const checkedItems = ref([]);
const checkAllItems = () => {
    if (!checkedItems.value.length) {
        props.items.data.forEach((item) => {
            if (item.can.delete == true) {
                checkedItems.value.push(item);
            }
        });
    } else {
        checkedItems.value = [];
    }
};
const checkedAllButton = ref(false);

watch(
    () => checkedItems.value,
    () =>
        checkedItems.value.length > 0
            ? (checkedAllButton.value = true)
            : (checkedAllButton.value = false)
);

const deleteAll = () => {
    deleteMultipleItems.value = true;
    showDeleteModal(checkedItems.value);
};


interface filtersValuesDataType {
    [key: string]: {
        id: string;
        data: string | number;
    };
}

const filtersValuesData = ref({} as filtersValuesDataType);
const filtersValuesDataMethod = (data :filtersValuesDataType  ) => {
    filtersValuesData.value = data;
};

const animate = ref(true);
const startLeaveAnimation = () => {
    animate.value = false;
};

</script>

<template>
    <AppLayout :breadcrumbs="breadcrumb" :header="'profile'">
        <Head :title="props.title" />

            <Container>

                           <AddNew
                :show="isFilled"
                @reset="resetFilter"
                @deleteAll="deleteAll"
                :checkedItems="checkedItems.length"
                :showDeleteAll="can.delete"
            >
                <Button
                    color="linear_blue"
                    v-if="can.create"
                    @click="fireshowDialogModal"
                >
                    {{ $t("general.add new nationality") }}
                </Button>

                <!-- /////////////////////////////////////////custum headers /////////////////////////////////////////////////// -->
                <template #customHeaderButton>
                    <CustomHeaderButton
                        :showTitle="false"
                        button_title="filter"
                        color="linear_black"
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
                                    class="mx-1 mt-2 mb-2 rtl:bg-linear-to-r ltr:bg-linear-to-l from-yellow-500 via-orange-600 to-red-900 px-2 py-1 rounded shadow-md border border-gray-300"
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
                                                :id="header.name"
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




                   <Table
                @startLeaveAnimation="startLeaveAnimation"
                :headers="finalHeaders"
                :items="items"
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
                                class="w-40 mx-1 mt-2"
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
                        <Checkbox
                            v-if="item.can.delete"
                            :value="item"
                            class="rtl:mr-1 ltr:ml-1"
                            v-model:checked="checkedItems"
                        />
                    </Td>
                    <!-- ///////////////////////////////////////////////////// -->
                    <Td light v-show="showColumnItems('#')">
                        {{ items.meta.from + index }}
                    </Td>

                    <Td light v-show="showColumnItems('name')">
                        <Button color="linear_orange" small class="">
                            {{ item.name }}
                        </Button>
                    </Td>

                    <Td bold v-show="showColumnItems('active')">
                        <Button
                            :color="
                                item.active == true
                                    ? 'linear_green'
                                    : 'linear_red'
                            "
                            small
                            class=""
                        >
                            {{
                                item.active == true
                                    ? $t("general.yes")
                                    : $t("general.no")
                            }}
                        </Button>
                    </Td>

                    <Td bold v-show="showColumnItems('added by')">
                        <Button color="linear_blue" small class="">
                            {{ item.added_by_user?.name }}
                        </Button>
                    </Td>
                    <Td bold v-show="showColumnItems('updated by')">
                        <Button color="linear_green" small class="">
                            {{ item.updated_by_user?.name }}
                        </Button>
                    </Td>

                    <Td bold v-show="showColumnItems('created_at')">
                        <Button color="linear_yellow" small>
                            {{ item.created_at_formatted }}
                        </Button>

                        <!-- {{  new Date(item.created_at).toLocaleString() }} -->
                    </Td>
                    <Td bold v-show="showColumnItems('updated at')">
                        <Button color="linear_orange" small>
                            {{ item.updated_at_formatted }}
                        </Button>

                        <!-- {{  new Date(item.created_at).toLocaleString() }} -->
                    </Td>
                    <Td v-show="showColumnItems('actions')">
                        <!-- <Actions
                                    :edit-link="
                                        route(`${routeResourceName}.edit`, {
                                            id: item.id,
                                        })
                                    "
                                    :show-edit="item.can.edit"
                                    :show-delete="item.can.delete"
                                    @deleteClicked="showDeleteModal(item)"
                                /> -->

                        <Actions
                            :showEditModal="true"
                            :show-edit="item.can.edit"
                            :show-delete="item.can.delete"
                            @editClicked="fireShowEditModal(item)"
                            @deleteClicked="showDeleteModal(item)"
                        >
                        </Actions>
                    </Td>
                </template>
            </Table>
                
            </Container>


    </AppLayout>



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
                <span v-if="isDeleting">{{ $t("general.deleting") }}</span>
                <span v-else>{{ $t("general.delete") }}</span>
            </Button>
        </template>
    </Modal>

    <!-- //////////////////////////Dialog Modal/////////////////////////////////////// -->

    <DialogModal
        :show="dialogModal"
        @close="closeDialogModal"
    >
        <template #title>
            {{
                editMode == true
                    ? $t("general.edit nationality")
                    : $t("general.add new nationality")
            }}
        </template>

        <template #content>
            <Form 
             v-bind="NationalityController.store.form()"
                    class="space-y-6"
                    v-slot="{ errors, processing, recentlySuccessful }">
                <div class="grid grid-cols-2 gap-2 mb-1">
                    <InputGroup
                        label="name in arabic"
                        translationFolder="general."
                        type="text"
                        name="name.ar"
                        :default-value="currentItem.name.ar"
                        :error-message="props.errors['name.ar']"

                        :message="errors.name"
                        required
                        />
                        
                        
                        <InputGroup
                        label="name in english"
                        translationFolder="general."
                        type="text"
                        name="name.en"
                        :default-value="currentItem.name.en"
                        :error-message="props.errors['name.en']"
                        
                        :message="errors.name"
                        required
                    />

                    <div class="xl:col-span-1">
                        <span class="text-zinc-300 mx-5">{{
                            $t("general.active")
                        }}</span>
                        <label
                            class="xl:col-span-1 mt- flex justify-start px-2 rtl:bg-linear-to-r ltr:bg-linear-to-l from-transparent to-zinc-800 rounded-full shadow-md border border-zinc-300/20"
                        >
                            <div class="my-0.5">
                                <CheckboxGroup
                                    class=""
                                    :label="currentItem.active ? 'yes ' : 'no' "
                                    :default-value="currentItem.active"
                                    :errorMessage="props.errors.active"
                                />
                            </div>
                        </label>
                    </div>
                </div>

                <div class="flex justify-center mt-4">
                    <button
                        :disabled="isSaving"
                        type="submit"
                        class="mb-2 px-12 py-1 rounded-full text-white bg-linear-to-l from-orange-800 to-orange-500 hover:from-orange-900 hover:to-orange-500 border-orange-100 duration-300 capitalize tracking-wider ease-in-out hover:scale-110 shadow-black drop-shadow-2xl shadow-2xl border text-sm"
                    >
                        {{
                            isSaving ? $t("general.saving") : $t("general.save")
                        }}
                    </button>
                </div>
            </Form>
        </template>
    </DialogModal>

    <!-- <DialogModal
        :show="dialogModal"
        @close="closeDialogModal"
    >
        <template #title>
            {{
                editMode == true
                    ? $t("general.edit nationality")
                    : $t("general.add new nationality")
            }}
        </template>

        <template #content>
            <form @submit.prevent="addNewOrEdit">
                <div class="grid grid-cols-2 gap-2 mb-1">
                    <InputGroup
                        label="name in arabic"
                        translationFolder="general."
                        type="text"
                        v-model="form.name.ar"
                        :error-message="props.errors['name.ar']"
                        required
                    />
                    <InputGroup
                        label="name in english"
                        translationFolder="general."
                        type="text"
                        v-model="form.name.en"
                        :error-message="props.errors['name.en']"
                        required
                    />

                    <div class="xl:col-span-1">
                        <span class="text-zinc-300 mx-5">{{
                            $t("general.active")
                        }}</span>
                        <label
                            class="xl:col-span-1 mt- flex justify-start px-2 rtl:bg-linear-to-r ltr:bg-linear-to-l from-transparent to-zinc-800 rounded-full shadow-md border border-zinc-300/20"
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
                        :disabled="isSaving"
                        type="submit"
                        class="mb-2 px-12 py-1 rounded-full text-white bg-linear-to-l from-orange-800 to-orange-500 hover:from-orange-900 hover:to-orange-500 border-orange-100 duration-300 capitalize tracking-wider ease-in-out hover:scale-110 shadow-black drop-shadow-2xl shadow-2xl border text-sm"
                    >
                        {{
                            isSaving ? $t("general.saving") : $t("general.save")
                        }}
                    </button>
                </div>
            </form>
        </template>
    </DialogModal> -->
</template>
