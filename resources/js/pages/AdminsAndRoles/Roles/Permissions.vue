<script setup>
import { computed, ref, onMounted } from "vue";
import { router } from "@inertiajs/vue3";
import Container from "@/Components/Container.vue";
import Card from "@/Components/Card/Card.vue";
import Table from "@/Components/Table/Table.vue";
import Td from "@/Components/Table/Td.vue";
import Button from "@/Components/Button.vue";
import Input from "@/Components/Input.vue";
import { trans } from "laravel-vue-i18n";
import Checkbox from "@/Components/Checkbox.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import BreadCrumbs from "@/Components/BreadCrumbs.vue";


import { Axios } from "axios";

const props = defineProps({
    role: {
        type: Object,
        default: () => {
            permissions: [];
        },
    },
    // permissions: {
    //     type: Array,
    // },
    pagesPermissions: {
        type: Array,
    },
    // specialPermissions: {
    //     type: Array,
    // },
    breadcrumbs: {
        type: [Array, Object],
        default: [{}],
    },
});

const roleHasPermission = (permission) => {
    /// return boolean
    return props.role.permissions.some((p) => p.id == permission);
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
                type: 1 // normal permission to be assigned to a role
            })
            .then((response) => {
                return toastMethod(event, response.data);
            });
    } else if (event.target.checked == false) {
        axios
            .post(route("roles.detach-permission"), {
                roleId: props.role.id,
                permissionId: permission,
                type: 1 // normal permission to be assigned to a role

            })
            .then((response) => {
                return toastMethod(event, response.data);
            });
    }
};

const toastMethod = (event, response) => {
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

const headers = [
    { name: "#", label: "#" },
    { name: "name", label: "page name" },
    {
        name: "view",
        label: "view",
    },
    {
        name: "create",
        label: "create",
    },
    {
        name: "edit",
        label: "edit",
    },
    {
        name: "delete",
        label: "delete",
    },
    {
        name: "approve",
        label: "approve",
    },
    {
        name: "close",
        label: "close",
    },
    {
        name: "cancel",
        label: "cancel",
    },
    {
        name: "print",
        label: "print",
    },
];
// const specialPermissionsheaders = [
//     { name: "#", label: "#" },
//     { name: "name", label: "permission name" },
   
//     {
//         name: "select",
//         label: "select",
//     },
// ];

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
// const animate = ref(true);
// const startLeaveAnimation = () => {
//     animate.value = false;
// };
</script>

<template>
    <!-- <hr class="h-px bg-white bg-gradient-horizontal-dark mt-2" /> -->


    <Table
    :headers="headers"
    :items="props.pagesPermissions"
    :headersClasses="headersClasses"
    :trClasses="trClasses"
    :hoverClasses="hoverClasses"
    :headerFooterClasses="headerFooterClasses"
    noCheckAll
    tableHeight="customtableheight"
            noPagination
            noNamePadding
            class="mt-2 "
            bodyClasses=" rounded-null"
        >
            <template #title>
                {{ $t("general.permissions") }}
            </template>
            <template v-slot="{ item, index }">
                <!-- //////////////////////////checked row item///////////////////////// -->
    
                <!-- ///////////////////////////////////////////////////// -->
                <Td light>
                    {{ index + 1 }}
                </Td>
    
                <Td light>
                    <!-- <Button color="gradient_white" small class="">
                        {{ item.name }}
                    </Button> -->
    
                    <div class="flex min-w-36">
                        {{ item.name }}
                    </div>
                </Td>
    
                <Td light>
                    <input
                        @change="
                            attachDeattachPermission(
                                $event,
                                item.permissions['view']
                            )
                        "
                        :class="checkboxClasses"
                        type="checkbox"
                        v-show="item.permissions['view']"
                        :disabled="item.permissions['view'] == null"
                        :checked="roleHasPermission(item.permissions['view'])"
                    />
                </Td>
                <Td light>
                    <input
                        @change="
                            attachDeattachPermission(
                                $event,
                                item.permissions['create']
                            )
                        "
                        :class="checkboxClasses"
                        type="checkbox"
                        v-show="item.permissions['create']"
                        :disabled="item.permissions['create'] == null"
                        :checked="roleHasPermission(item.permissions['create'])"
                    />
                </Td>
                <Td light>
                    <input
                        @change="
                            attachDeattachPermission(
                                $event,
                                item.permissions['edit']
                            )
                        "
                        :class="checkboxClasses"
                        type="checkbox"
                        v-show="item.permissions['edit']"
                        :disabled="item.permissions['edit'] == null"
                        :checked="roleHasPermission(item.permissions['edit'])"
                    />
                </Td>
                <Td light>
                    <input
                        @change="
                            attachDeattachPermission(
                                $event,
                                item.permissions['delete']
                            )
                        "
                        :class="checkboxClasses"
                        type="checkbox"
                        v-show="item.permissions['delete']"
                        :disabled="item.permissions['delete'] == null"
                        :checked="roleHasPermission(item.permissions['delete'])"
                    />
                </Td>
                <Td light>
                    <input
                        @change="
                            attachDeattachPermission(
                                $event,
                                item.permissions['approve']
                            )
                        "
                        :class="checkboxClasses"
                        type="checkbox"
                        v-show="item.permissions['approve']"
                        :disabled="item.permissions['approve'] == null"
                        :checked="roleHasPermission(item.permissions['approve'])"
                    />
                </Td>
                <Td light>
                    <input
                        @change="
                            attachDeattachPermission(
                                $event,
                                item.permissions['close']
                            )
                        "
                        :class="checkboxClasses"
                        type="checkbox"
                        v-show="item.permissions['close']"
                        :disabled="item.permissions['close'] == null"
                        :checked="roleHasPermission(item.permissions['close'])"
                    />
                </Td>
                <Td light>
                    <input
                        @change="
                            attachDeattachPermission(
                                $event,
                                item.permissions['cancel']
                            )
                        "
                        :class="checkboxClasses"
                        type="checkbox"
                        v-show="item.permissions['cancel']"
                        :disabled="item.permissions['cancel'] == null"
                        :checked="roleHasPermission(item.permissions['cancel'])"
                    />
                </Td>
                <Td light>
                    <input
                        @change="
                            attachDeattachPermission(
                                $event,
                                item.permissions['print']
                            )
                        "
                        :class="checkboxClasses"
                        type="checkbox"
                        v-show="item.permissions['print']"
                        :disabled="item.permissions['print'] == null"
                        :checked="roleHasPermission(item.permissions['print'])"
                    />
                </Td>
            </template>
        </Table>
        <!-- <div class=" lg:col-span-2 mt-2">
            <div class=" bg-white/40 rounded-t px-5 py-1 text-gray-800 font-bold"> {{ $t('general.extra permissions')}} </div>
            <div class=" w-full border rounded-b  border-white/30 bg-black/40 ">
    
                <div class="  p-1 " v-for="(item, index) in props.specialPermissions" :key="index">
                    <div  class="flex justify-startw-full text-sm items-center gap-3  p-2 text-gray-200  "
                    :class="index  == props.specialPermissions?.length - 1 ? '' : ' border-b border-gray-200/10' "
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
                        :disabled="item.permissions['id'] == null"
                        :checked="roleHasPermission(item.permissions['id'])"
                    /> 
                        <span> {{ item.name }} </span>   
                        
                    </div>
                </div>
    
                <div class="  p-1" v-for="(item, index) in props.specialPermissions" :key="index">
                    <label  class="flex justify-start col-span-1 w-full text-sm shadow-2 shadow-black/20  items-center gap-3 border bg-black/40  rounded  border-white/40 p-2 h-16 text-gray-200   "> 
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
                        :disabled="item.permissions['id'] == null"
                        :checked="roleHasPermission(item.permissions['id'])"
                    /> 
                        <span> {{ item.name }} </span>   
                    </label>
                </div>

    </div>

        </div> -->

</template>
