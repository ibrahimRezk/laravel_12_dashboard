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
import useDeleteItem from "@/Composables/useDeleteItem.js";
import useFilters from "@/Composables/useFilters.js";
import CheckboxGroup from "@/Components/CheckboxGroup.vue";
import { trans } from "laravel-vue-i18n";
import { router } from "@inertiajs/vue3";
import SelectGroup from "@/Components/SelectGroup.vue";
import InputGroup from "@/Components/InputGroup.vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps(
    {
        edit: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
        },


        item: {
            type: Object,
            default: () => {},
        },
        role: {
            type: Object,
            default: () => {},
        },
        currentUserRole: {
            type: Object,
            default: () => {},
        },
        specialPermissions: {
            type: Array,
        },
   

  

        headers: {
            type: Array,
            default: () => [],
        },
  
        errors: {
            type: Object,
            default: () => {},
        },

        method: String,
        can: Object,
        breadcrumbs: {
            type: [Array, Object],
            default: [{}],
        },
    },
    { deep: true }
);

const modelHasPermission = (permission) => { 
    /// return boolean
    return props.item?.permissions?.some((p) => p.id == permission);
};
const direction = ref(
    document.getElementsByTagName("html")[0].getAttribute("dir")
);

const attachDeattachPermission = (event, permission) => {
    if (event.target.checked == true) {
        axios
            .post(route("roles.attach-permission"), {
                roleId: props.role.id,
                permissionId: permission,
                userId: props.item?.id,
                type: 2, // special permission to be assigned to a user model
            })
            .then((response) => {
                return toastMethod(event, response.data);
            });
    } else if (event.target.checked == false) {
        axios
            .post(route("roles.detach-permission"), {
                roleId: props.role.id,
                permissionId: permission,
                userId: props.item?.id,
                type: 2, // special permission to be assigned to a user model
            })
            .then((response) => {
                return toastMethod(event, response.data);
            });
    }
};

const toastMethod = (event, response) => {
    console.log(response);
    if (response.result !== "error") {
        toast(trans(`general.${response.message}`), {
            type: toast.TYPE.SUCCESS,
            autoClose: 2500,
            theme: "colored",
            position:
                direction.value == "ltr"
                    ? toast.POSITION.TOP_RIGHT
                    : toast.POSITION.TOP_LEFT,
            rtl: direction.value == "ltr" ? false : true,
            transition: "bounce", // flip , slide , zoom , bounce
            hideProgressBar: false,
            pauseOnHover: true,
        });
    } else {
        event.target.checked = !event.target.checked; // this line to undo check or uncheck action to return it to it's original case becase we have here error
        toast(trans(`general.something goes wrong`), {
            ////////////////////
            type: toast.TYPE.ERROR, /////////////////////
            autoClose: 2500,
            theme: "colored",
            position:
                direction.value == "ltr"
                    ? toast.POSITION.TOP_RIGHT
                    : toast.POSITION.TOP_LEFT,
            rtl: direction.value == "ltr" ? false : true,
            transition: "bounce", // flip , slide , zoom , bounce
            hideProgressBar: false,
            pauseOnHover: true,
        });
    }
};




const activeColor = (item) => {
    return item.active == 1 ? "gradient_orange" : "gradient_red";
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

const checkboxClasses = computed(() => {
    return "rounded text-yellow-600 border-gray-300 shadow-sm focus:ring-indigo-500";
});

// const TableClasses = computed(() => {
//     return " flex rtl:justify-right ltr:justify-left items-center w-full align-top border-zinc-800 text-zinc-500";
// });
// const TheadClasses = computed(() => {
//     return "w-full align-bottom bg-zinc-800";
// });
const ThClasses = computed(() => {
    return "px-6 py-3 font-normal rtl:text-right ltr:text-left capitalize bg-transparent border-b border-gray-200 shadow-none text-size-xs border-b-solid tracking-none whitespace-nowrap text-slate-200 opacity-90";
});
const TdClasses = computed(() => {
    return "w-full hover:bg-neutral-700 bg-zinc-900 px-2 py-1 font-seminormal capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-sm text-zinc-400 drop-shadow-lg";
});

const TableClasses = computed(() => {
    return "   flex border border-gray-400/10 text-zinc-500";
});
const TheadClasses = computed(() => {
    return " from-zinc-800/50 to-zinc-800/50 via-zinc-800/30 dark:via-zinc-800 dark:from-zinc-800 dark:to-zinc-800 grid  lg:grid-cols-3 w-full align-bottom bg-gradient-to-b";
});

const mainTrClasses = "grid grid-cols-2  hover:bg-neutral-700";

const mainThClasses =
    "flex flex-wrap hover:bg-neutral-700 px-2 py-1 h-14 items-center flex justify-start font-normal    dark:font-normal rtl:text-right ltr:text-left capitalize bg-transparent dark:bg-zinc-800 border-b border-gray-200/20 shadow-none   text-size-xs border-b-solid tracking-none  text-zinc-100 dark:text-slate-100  dark:text-slate-200  opacity-90";

const mainTdClasses =
    "flex flex-wrap hover:bg-neutral-700  bg-zinc-900/40 dark:bg-zinc-900/70  px-2 flex items-center    font-seminormal capitalize  border-b border-gray-200/20 border-solid shadow-none tracking-none  text-sm dark:text-zinc-400 text-zinc-300 drop-shadow-lg";

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
        <Container
            :animate="animate"
            class="from-zinc-800 via-orange-200 to-zinc-800"
        >
            <Card class="mx-1" no-padding>
                <table :class="TableClasses">
                    <thead :class="TheadClasses">
                        <div>
                            <tr :class="mainTrClasses">
                                <th :class="mainThClasses">
                                    {{ $t("general.name") }}
                                </th>
                                <td :class="mainTdClasses">
                                    <span class="text-sm text-zinc-400">
                                        {{ props.item.name }}
                                    </span>
                                </td>
                            </tr>
                            <tr :class="mainTrClasses">
                                <th :class="mainThClasses">
                                    {{ $t("general.email") }}
                                </th>
                                <td :class="mainTdClasses">
                                    <span class="text-sm text-zinc-400">
                                        {{ props.item.email }}
                                    </span>
                                </td>
                            </tr>
              

                         
                          
                        </div>
                        <div>
                           

                            <tr :class="mainTrClasses">
                                <th :class="mainThClasses">
                                    {{ $t("general.phone") }}
                                </th>
                                <td :class="mainTdClasses">
                                    <span class="text-sm text-zinc-400">
                                        {{ props.item.profile?.phone }}
                                    </span>
                                </td>
                            </tr>
                     
                            <tr :class="mainTrClasses">
                                <th :class="mainThClasses">
                                    {{ $t("general.active") }}
                                </th>
                                <td :class="mainTdClasses">
                                    <span class="text-sm text-zinc-400">
                                        <Button
                                            :color="
                                                props.item.active == true
                                                    ? 'gradient_green'
                                                    : 'gradient_red'
                                            "
                                            small
                                            class="px-5 mx-2"
                                        >
                                            {{
                                                props.item.active == true
                                                    ? $t("general.yes")
                                                    : $t("general.no")
                                            }}
                                        </Button>
                                    </span>
                                </td>
                            </tr>
                      
                          
                        </div>
                        <div>
           
                        
                      

                            <tr :class="mainTrClasses">
                                <th :class="mainThClasses">
                                    {{ $t("general.created_at") }}
                                </th>
                                <td :class="mainTdClasses">
                                    <span class="text-sm text-zinc-400">
                                        {{ props.item.created_at_formatted }}
                                    </span>
                                </td>
                            </tr>

                            <tr :class="mainTrClasses">
                                <th :class="mainThClasses">
                                    {{ $t("general.role") }}
                                </th>
                                <td :class="mainTdClasses">
                                    <span class="text-sm text-zinc-400">
                                        {{ props.role?.slug }}
                                    </span>
                                </td>
                            </tr>
              
                        </div>
                    </thead>
                </table>
            </Card>

            <Card
                class="from-zinc-900 via-orange-300 to-black mx-1 mt-3 h-full"
            >
                <div class="lg:col-span-2 pt-2 pb-1">
                    <div
                        class="bg-white/40 rounded-t px-5 text-gray-800 font-bold"
                    >
                        {{ $t("general.special permissions") }}
                    </div>
                    <div
                        class="grid lg:grid-cols-3 w-full border rounded-b border-white/30 bg-black/40"
                    >
                        <div
                            class="p-1"
                            v-for="(item, index) in props.specialPermissions"
                            :key="index"
                        >
                            <div
                                class="flex text-sm items-center gap-3 p-2 text-gray-200"
                                :class="
                                    index ==
                                    props.specialPermissions?.length - 1
                                        ? ''
                                        : ' border-b border-gray-200/10'
                                "
                            >
                                <input
                                    @change="
                                        attachDeattachPermission(
                                            $event,
                                            item.permissions['id']
                                        )
                                    "
                                    :class="checkboxClasses"
                                    type="checkbox"
                                    v-show="item.permissions['id']"
                                    :disabled="
                                        item.permissions['id'] == null ||
                                        props.can?.editRole == false
                                    "
                                    :checked="
                                        modelHasPermission(
                                            item.permissions['id']
                                        )
                                    "
                                />
                                <span> {{ item.name }} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

        </Container>
    </Layout>

</template>
