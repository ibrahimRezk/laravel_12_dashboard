<script setup lang="ts">
// import Layout from "@/Layouts/Authenticated.vue";
// import BreadCrumbs from "@/components/BreadCrumbs.vue";
import Container from '@/components/Container.vue';
import InputError from "@/components/InputError.vue";
import { Button } from '@/components/ui/button';
import Card from "@/components/Card/Card.vue";
import { Head, useForm } from "@inertiajs/vue3";
import { ref, computed, watch, onMounted } from "vue";
// import SelectGroup from "@/components/SelectGroup.vue";
// import { trans } from "laravel-vue-i18n";
// import DialogModal from "@/components/DialogModal.vue";
// import InputGroup from "@/components/InputGroup.vue";
import AppLayout from '@/layouts/AppLayout.vue';

import { type BreadcrumbItem } from '@/types';
import SystemSettingController from '@/actions/App/Http/Controllers/SystemSettingController';
import Input from '@/components/ui/input/Input.vue';

const props = defineProps({
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

    logoPath: {
        type: String,
        default: () => "",
    },

    errors: {
        type: Object,
        default: () => {},
    },

    routeResourceName: {
        type: String,
        required: true,
    },
    breadcrumbs: {
        type: [Array, Object],
        default: [{}],
    },
});


const breadcrumb: BreadcrumbItem[] = [
    {
        title: props.title,
        href: SystemSettingController.index(),
    },
];

////////////// weekend days//////////////////////
const dialogModal = ref<boolean>(false);
const fireshowDialogModal = () => {
    dialogModal.value = true;
};
const closeDialogModal = () => {
    (dialogModal.value = false), (secondDialogModal.value = false);
};

const weekendDaysList = [
    { id: 1, name: "Saturday" },
    { id: 2, name: "Sunday" },
    { id: 3, name: "Monday" },
    { id: 4, name: "Tuesday" },
    { id: 5, name: "Wednesday" },
    { id: 6, name: "Thursday" },
    { id: 7, name: "Friday" },
];

const companyWeekendDays = ref([]);

onMounted(() => {
    props.item?.weekendDays?.map((day) => {
        companyWeekendDays.value.push(day);
    });
});
//////////////////////////////////////////////////////////////////

////////////// vacations dates //////////////////////////////
const secondDialogModal = ref(false);



//////////////////////////////////////////////////////////////////

const currentLogo = ref(props.logoPath ?? null);

const form = useForm({
    name: {
        ar: props.item !== null ? props?.item["name.ar"] : "",
        en: props.item !== null ? props?.item["name.en"] : "",
    },
    address: {
        ar: props.item !== null ? props?.item["address.ar"] : "",
        en: props.item !== null ? props?.item["address.en"] : "",
    },
    currency: {
        ar: props.item !== null ? props?.item["currency.ar"] : "",
        en: props.item !== null ? props?.item["currency.en"] : "",
    },

    active: props?.item?.active ?? "",
    active_monitoring: props?.item?.active_monitoring ?? "",
    transfer_vacation_balance_to_next_year: props?.item?.transfer_vacation_balance_to_next_year ?? "",
    phone: props?.item?.phone ?? "",
    email: props?.item?.email ?? "",
    min_checkin_time: props?.item?.min_checkin_time ?? "",
    max_checkin_time: props?.item?.max_checkin_time ?? "",
    min_checkout_time: props?.item?.min_checkout_time ?? "",
    max_checkout_time: props?.item?.max_checkout_time ?? "",
    maximum_overtime_hours: props?.item?.maximum_overtime_hours ?? "",
    miniutes_before_calculate_delay:
        props?.item?.miniutes_before_calculate_delay ?? "",
    miniutes_before_calculate_early_departure:
        props?.item?.miniutes_before_calculate_early_departure ?? "",
    minuites_before_calculate_quarterday_deduct:
        props?.item?.minuites_before_calculate_quarterday_deduct ?? "",
    minuites_before_calculate_halfday_deduct:
        props?.item?.minuites_before_calculate_halfday_deduct ?? "",
    minuites_before_calculate_allday_deduct:
        props?.item?.minuites_before_calculate_allday_deduct ?? "",
    monthly_vacation_balance: props?.item?.monthly_vacation_balance ?? "",
    days_before_begin_vacation: props?.item?.days_before_begin_vacation ?? "",
    first_balance_begin_vacation:
        props?.item?.first_balance_begin_vacation ?? "",
    sanctions_value_first_abcence:
        props?.item?.sanctions_value_first_abcence ?? "",
    sanctions_value_second_abcence:
        props?.item?.sanctions_value_second_abcence ?? "",
    sanctions_value_third_abcence:
        props?.item?.sanctions_value_third_abcence ?? "",

    sanctions_value_fourth_abcence:
        props?.item?.sanctions_value_fourth_abcence ?? "",
    attendance_method:
        props?.item?.attendance_method ?? "",
        fingerprint_attendance_applying_method:
        props?.item?.fingerprint_attendance_applying_method ?? "",

    added_by: props?.item?.added_by ?? "",
    updated_by: props?.item?.updated_by_user?.name ?? "",

    weekendDays: props?.item?.weekendDays ?? [],

    // // currentLogo: null,
    logo: null,
});

// const color = computed(()=>{
//     return form.active == true ? 'bg-green-600' : 'bg-red-600'
// })

const color = ref()

const setActiveColor = () => {
    return form.active == true
    ? (color.value =
    "bg-linear-to-l   from-green-900 to-green-700 hover:from-green-700 hover:to-green-500 active:bg-green-600")
    : (color.value =
    "bg-linear-to-l   from-red-800 to-red-600 hover:from-red-800 hover:to-red-500 active:bg-red-900");
};


const ActiveMonitorcolor = ref("");
const setActiveMonitorColor = () => {
    return form.active_monitoring == true
    ? (ActiveMonitorcolor.value =
              "bg-linear-to-l   from-sky-900 to-sky-700 hover:from-sky-700 hover:to-sky-500 active:bg-sky-600")
              : (ActiveMonitorcolor.value =
              "bg-linear-to-l   from-orange-800 to-orange-600 hover:from-orange-800 hover:to-orange-500 active:bg-orange-900");
            };
  
            
const transferColor = ref("");

const setTransferColor = () => {
    return form.transfer_vacation_balance_to_next_year == true
        ? (transferColor.value =
              "bg-linear-to-l   from-blue-900 to-blue-700 hover:from-blue-700 hover:to-blue-500 active:bg-blue-600")
        : (transferColor.value =
              "bg-linear-to-l   from-gray-800 to-gray-600 hover:from-gray-800 hover:to-gray-500 active:bg-gray-900");
};

const formContent = ref();
onMounted(() => {
    formContent.value = form;
    setActiveColor();
    setActiveMonitorColor();
    setTransferColor();
});
const save_changes_button = ref(false);

watch(
    () => form,
    () => (save_changes_button.value = true),
    {
        deep: true,
    }
);

const changeStatus = () => {
    form.active = !form.active;
    return setActiveColor();
};

const changeAlertMonitorStatus = () => {
    form.active_monitoring = !form.active_monitoring;
    return setActiveMonitorColor();
};

const changeTransferStatus = () => {
    form.transfer_vacation_balance_to_next_year = !form.transfer_vacation_balance_to_next_year;
    return setTransferColor();
};



// const loadFile = function () {
//     const output = document.getElementById("output");
//     output.src = URL.createObjectURL($event.target.files[0]);
//     output.onload = function () {
//         URL.revokeObjectURL(output.src); // free memory
//     };
// };

const loadFile = (event: Event): void => {
    // Cast the element to an HTMLImageElement to access the .src property
    const output = document.getElementById("output") as HTMLImageElement | null;
    
    // Cast the event target to an HTMLInputElement to access .files
    const target = event.target as HTMLInputElement;

    if (output && target.files && target.files[0]) {
        const file = target.files[0];
        output.src = URL.createObjectURL(file);
        
        output.onload = () => {
            URL.revokeObjectURL(output.src); // free memory
        };
    }
};

const tab = ref(0);

const editTab = (num: number) => {
    return (tab.value = num);
};

const trClasses = "grid grid-cols-2  hover:bg-neutral-700";

const thClasses =
    "flex flex-wrap hover:bg-neutral-700 px-2 py-1 h-14 items-center flex justify-start font-normal   dark:font-normal rtl:text-right ltr:text-left capitalize bg-transparent border-b border-gray-200/20 shadow-none   text-size-xs border-b-solid tracking-none  text-zinc-100 dark:text-slate-100  dark:text-slate-200  opacity-90";

const tdClasses =
    "flex flex-wrap hover:bg-neutral-700  bg-zinc-900/40 dark:bg-zinc-900/70  px-2 flex items-center    font-seminormal capitalize  border-b border-gray-200/20 border-solid shadow-none tracking-none  text-sm dark:text-zinc-400 text-zinc-300 drop-shadow-lg";

const spanClasses = "   text-sm text-zinc-100 dark:text-zinc-400 ";

const inputClass =
    " h-10 rounded rtl:text-right ltr:text-left w-full bg-linear-to-l from-black to-gray-800 hover:from-black hover:to-gray-900 active:bg-gray-900 focus:border-white/30 focus:shadow-outline-gray text-gray-300  shadow-md border border-white/30 text-shadow-none text-sm ";

const submit = () => {
    form.post(route(`${props.routeResourceName}.store`), {
        preserveState: false, // save_changes_button will not affect if this is true
        onSuccess: () => {
            tab.value = 0;
            save_changes_button.value = false;
        },
    });
};



const theadClass = computed(()=>{
    return  save_changes_button.value == true ? 'from-blue-800/50 to-blue-800/50 via-blue-800/30 dark:via-sky-800/10 dark:from-sky-800/10 dark:to-sky-800/10' :  ' from-zinc-800/50 to-zinc-800/50 via-zinc-800/30 dark:via-zinc-800 dark:from-zinc-800 dark:to-zinc-800'
})
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumb" :header="'System Settings'">
        <Head :title="props.title" />
        <Container>
            <Card class="mx-1  text-sm" no-padding>
                <table class="flex border border-gray-400/10 text-zinc-500 text-[13px]">
                    <thead
                         class="w-full align-bottom bg-linear-to-b"
                        :class="theadClass"
                    >
                        <div
                            class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 overflow-clip"
                        >
                            <tr :class="trClasses">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{ $t("general.company name in arabic") }}
                                </th>
                                <td @click="editTab(1)" :class="tdClasses">
                              

                                    <Input
                        class="dialog-input mt-2"
                        id="name.ar"
                        name="name.ar"
                        v-on:keyup.enter="tab = 0"
                        v-show="tab == 1"
                        v-model="form.name.ar"
                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 1"
                                    >
                                        {{ form.name.ar }}
                                    </span>
                                    <InputError
                                        class="flex justify-start"
                                        :error-message="props.errors['name.ar']"
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{ $t("general.company name in english") }}
                                </th>
                                <td @click="editTab(2)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 2"
                                        v-model="form.name.en"
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 2"
                                    >
                                        {{ form.name.en }}
                                    </span>
                                    <InputError
                                        class="flex justify-start"
                                        :error-message="props.errors['name.en']"
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{
                                        $t("general.company address in arabic")
                                    }}
                                </th>
                                <td @click="editTab(3)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 3"
                                        v-model="form.address.ar"
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 3"
                                    >
                                        {{ form.address.ar }}
                                    </span>
                                    <InputError
                                        class="flex justify-start"
                                        :error-message="
                                            props.errors['address.ar']
                                        "
                                    />
                                </td>
                            </tr>

                            <tr :class="trClasses">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{
                                        $t("general.company address in english")
                                    }}
                                </th>
                                <td @click="editTab(4)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 4"
                                        v-model="form.address.en"
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 4"
                                    >
                                        {{ form.address.en }}
                                    </span>
                                    <InputError
                                        class="flex justify-start"
                                        :error-message="
                                            props.errors['address.en']
                                        "
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{
                                        $t("general.company currency in arabic")
                                    }}
                                </th>
                                <td @click="editTab(5)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 5"
                                        v-model="form.currency.ar"
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 5"
                                    >
                                        {{ form.currency.ar }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :error-message="
                                            props.errors['currency.ar']
                                        "
                                    />
                                </td>
                            </tr>

                            <tr :class="trClasses">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{
                                        $t(
                                            "general.company currency in english"
                                        )
                                    }}
                                </th>
                                <td @click="editTab(6)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 6"
                                        v-model="form.currency.en"
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 6"
                                    >
                                        {{ form.currency.en }}
                                    </span>
                                    <InputError
                                        class="flex justify-start"
                                        :error-message="
                                            props.errors['currency.ar']
                                        "
                                    />
                                </td>
                            </tr>

                            <tr :class="trClasses">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{ $t("general.status") }}
                                </th>
                                <td @click="editTab(7)" :class="tdClasses">
                                    <button
                                        class="border-transparent capitalize tracking-wider focus:outline-none transition ease-in-out duration-150 rounded focus:border-white focus:shadow-outline-gray px-2 text-white font-normal shadow-md border  text-shadow-none hover:scale-110 truncate"
                                        :class="color"
                                        @click="changeStatus"
                                    >
                                        <h6
                                            class="mb-0 leading-normal text-size-sm text-zinc-100 font-normal"
                                        >
                                            {{
                                                form.active == true
                                                    ? $t("general.active")
                                                    : $t("general.inactive")
                                            }}
                                        </h6>
                                    </button>

                                    <InputError
                                        class="flex justify-start"
                                        :message="props.errors.active"
                                    />
                                </td>
                            </tr>


                            <tr :class="trClasses">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{ $t("general.phone") }}
                                </th>
                                <td @click="editTab(8)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 8"
                                        v-model="form.phone"
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 8"
                                    >
                                        {{ form.phone }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="props.errors.phone"
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{ $t("general.email") }}
                                </th>
                                <td @click="editTab(9)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                        type="email"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 9"
                                        v-model="form.email"
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 9"
                                    >
                                        {{ form.email }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="props.errors.email"
                                    />
                                </td>
                            </tr>

                            <tr :class="trClasses">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{ $t("general.monthly vacation balance") }}
                                </th>
                                <td @click="editTab(20)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                        type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 20"
                                        v-model="form.monthly_vacation_balance"
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 20"
                                    >
                                        {{
                                            form.monthly_vacation_balance
                                        }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors
                                                .monthly_vacation_balance
                                        "
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{
                                        $t("general.days before begin vacation")
                                    }}
                                </th>
                                <td @click="editTab(21)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                        type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 21"
                                        v-model="
                                            form.days_before_begin_vacation
                                        "
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 21"
                                    >
                                        {{
                                            form.days_before_begin_vacation
                                        }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors
                                                .days_before_begin_vacation
                                        "
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{
                                        $t(
                                            "general.first balance begin vacation"
                                        )
                                    }}
                                </th>
                                <td @click="editTab(22)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                        type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 22"
                                        v-model="
                                            form.first_balance_begin_vacation
                                        "
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 22"
                                    >
                                        {{
                                            form.first_balance_begin_vacation
                                        }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors
                                                .first_balance_begin_vacation
                                        "
                                    />
                                </td>
                            </tr>


                            <tr :class="trClasses">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{ $t("general.weekend") }}
                                </th>
                                <td :class="tdClasses">
                                    <span
                                        v-for="(day, index) in form.weekendDays"
                                        :key="index"
                                        class="text-sm text-yellow-200 mx-1"
                                    >
                                        <!-- {{ day }} -->
                                        {{ $t("general." + day) }}
                                    </span>
                                    <Button
                                        size="md"
                                        variant="linear_blue"
                                        class="hover:cursor-pointer mx-1 px-4 hover:scale-110 curser-pointer"
                                        @click="fireshowDialogModal"
                                    >
                                        {{ $t("general.edit") }}
                                    </Button>
                                </td>
                            </tr>

                        



                            
                            
                            <tr :class="trClasses">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{ $t("general.transfer_vacation_balance_to_next_year") }}
                                </th>
                                <td @click="editTab(28)" :class="tdClasses">
                                    <button
                                        class="border-transparent capitalize tracking-wider focus:outline-none transition ease-in-out duration-150 rounded focus:border-white focus:shadow-outline-gray px-2 text-white font-normal shadow-md border  text-shadow-none hover:scale-110 truncate"
                                        :class="transferColor"
                                        @click="changeTransferStatus"
                                    >
                                        <h6
                                            class="mb-0 leading-normal text-size-sm text-zinc-100 font-normal px-3"
                                        >
                                            {{
                                                form.transfer_vacation_balance_to_next_year == true
                                                    ? $t("general.yes")
                                                    : $t("general.no")
                                            }}
                                        </h6>
                                    </button>

                                    <InputError
                                        class="flex justify-start"
                                        :message="props.errors.transfer_vacation_balance_to_next_year"
                                    />
                                </td>
                            </tr>



                            <tr :class="trClasses">
                                <th
                                    @click="editTab(0)
                                    "
                                    :class="thClasses"
                                >
                                    {{ $t("general.attendance method") }}
                                </th>
                                <td
                                    @click="editTab(29)
                                    "
                                    :class="tdClasses"
                                >
                                
                                    <SelectGroup
                                        class="-mt-1 w-full"
                                        @change="tab = 29"
                                        v-show="tab == 29"
                                        translationFolder="general."
                                        v-model="form.attendance_method"
                                        :items="[
                                            {
                                                id: 1,
                                                name: $t(
                                                    'general.manual'
                                                ),
                                            },
                                            {
                                                id: 2,
                                                name: $t(
                                                    'general.fingerprint'
                                                ),
                                            },
                                        ]"
                                    />
    
                                    <div  class=" flex h-full w-full" :class="spanClasses" v-show="tab !== 29">
                                    <div class=" flex w-full h-full  align-middle items-center justify-center  rounded" 
                                   
                                    >
                                        <Button
                                            siz="sm"
                                            variant="linear_orange"
                                            class="px-2"
                                        >
                                            {{
                                                form.attendance_method == 1
                                                    ? $t("general.manual")
                                                    : form.attendance_method ==
                                                      2
                                                    ? $t(
                                                          "general.fingerprint"
                                                      )
                                                    : $t("general.not selected yet")
                                            }}
                                        </Button>
                                    </div>
                                    </div>
    
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors.attendance_method
                                        "
                                    />
                                </td>
                            </tr>


                            <tr :class="trClasses" v-show="form.attendance_method == 2">
                                <th
                                    @click="editTab(0)
                                    "
                                    :class="thClasses"
                                >
                                    {{ $t("general.how to apply fingerprint attendance") }}
                                </th>
                                <td
                                    @click="editTab(30)
                                    "
                                    :class="tdClasses"
                                >
                                
                                    <SelectGroup
                                        class="-mt-1 w-full"
                                        @change="tab = 30"
                                        v-show="tab == 30"
                                        translationFolder="general."
                                        v-model="form.fingerprint_attendance_applying_method"
                                        :items="[
                                            {
                                                id: 1,
                                                name: $t(
                                                    'general.automatically when fingerprint attendance data is imported'
                                                ),
                                            },
                                            {
                                                id: 2,
                                                name: $t(
                                                    'general.manually from the fingerprint attendance page'
                                                ),
                                            },
                                        ]"
                                    />
    
                                    <div  class=" flex h-full w-full" :class="spanClasses" v-show="tab !== 30">
                                    <div class=" flex w-full h-full  align-middle items-center  rounded" 
                                    
                                    >
                                        <Button
                                        wrap
                                            size="sm"
                                            variant="linear_white"
                                            class="px-2"
                                        >
                                            {{
                                                form.fingerprint_attendance_applying_method == 1
                                                    ? $t("general.automatically when fingerprint attendance data is imported")
                                                    : form.fingerprint_attendance_applying_method ==
                                                      2
                                                    ? $t(
                                                          "general.manually from the fingerprint attendance page"
                                                      )
                                                    : $t("general.not selected yet")
                                            }}
                                        </Button>
                                    </div>
                                    </div>
    
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors.fingerprint_attendance_applying_method
                                        "
                                    />
                                </td>
                            </tr>

                            <tr :class="trClasses" v-show="form.attendance_method == 2">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{ $t("general.min_checkin_time") }}
                                </th>
                                <td @click="editTab(10)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                        type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 10"
                                        v-model="form.min_checkin_time"
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 10"
                                    >
                                        {{ form.min_checkin_time }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="props.errors.min_checkin_time"
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses" v-show="form.attendance_method == 2">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{ $t("general.max_checkin_time") }}
                                </th>
                                <td @click="editTab(11)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                        type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 11"
                                        v-model="form.max_checkin_time"
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 11"
                                    >
                                        {{ form.max_checkin_time }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="props.errors.max_checkin_time"
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses"  v-show="form.attendance_method == 2">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{ $t("general.min_checkout_time") }}
                                </th>
                                <td @click="editTab(12)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                        type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 12"
                                        v-model="form.min_checkout_time"
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 12"
                                    >
                                        {{ form.min_checkout_time }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors.min_checkout_time
                                        "
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses" v-show="form.attendance_method == 2">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{ $t("general.max_checkout_time") }}
                                </th>
                                <td @click="editTab(13)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                    type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 13"
                                        v-model="form.max_checkout_time"
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 13"
                                    >
                                        {{ form.max_checkout_time }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors.max_checkout_time
                                        "
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses" v-show="form.attendance_method == 2">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{ $t("general.maximum overtime hours") }}
                                </th>
                                <td @click="editTab(14)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                    type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 14"
                                        v-model="form.maximum_overtime_hours"
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 14"
                                    >
                                        {{ form.maximum_overtime_hours }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors.maximum_overtime_hours
                                        "
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses" v-show="form.attendance_method == 2">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{
                                        $t(
                                            "general.miniutes before calculate delay"
                                        )
                                    }}
                                </th>
                                <td @click="editTab(15)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                    type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 15"
                                        v-model="
                                            form.miniutes_before_calculate_delay
                                        "
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 15"
                                    >
                                        {{
                                            form.miniutes_before_calculate_delay
                                        }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors
                                                .miniutes_before_calculate_delay
                                        "
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses"  v-show="form.attendance_method == 2">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{
                                        $t(
                                            "general.miniutes before calculate early departure"
                                        )
                                    }}
                                </th>
                                <td @click="editTab(16)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                        type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 16"
                                        v-model="
                                            form.miniutes_before_calculate_early_departure
                                        "
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 16"
                                    >
                                        {{
                                            form.miniutes_before_calculate_early_departure
                                        }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors
                                                .miniutes_before_calculate_early_departure
                                        "
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses"  v-show="form.attendance_method == 2">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{
                                        $t(
                                            "general.minuites before calculate quarterday deduct"
                                        )
                                    }}
                                </th>
                                <td @click="editTab(17)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                        type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 17"
                                        v-model="
                                            form.minuites_before_calculate_quarterday_deduct
                                        "
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 17"
                                    >
                                        {{
                                            form.minuites_before_calculate_quarterday_deduct
                                        }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors
                                                .minuites_before_calculate_quarterday_deduct
                                        "
                                    />
                                </td>
                            </tr>

                            <tr :class="trClasses"  v-show="form.attendance_method == 2">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{
                                        $t(
                                            "general.minuites before calculate halfday deduct"
                                        )
                                    }}
                                </th>
                                <td @click="editTab(18)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                    type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 18"
                                        v-model="
                                            form.minuites_before_calculate_halfday_deduct
                                        "
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 18"
                                    >
                                        {{
                                            form.minuites_before_calculate_halfday_deduct
                                        }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors
                                                .minuites_before_calculate_halfday_deduct
                                        "
                                    />
                                </td>
                            </tr>

                            <tr :class="trClasses" v-show="form.attendance_method == 2">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{
                                        $t(
                                            "general.minuites before calculate allday deduct"
                                        )
                                    }}
                                </th>
                                <td @click="editTab(19)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                    type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 19"
                                        v-model="
                                            form.minuites_before_calculate_allday_deduct
                                        "
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 19"
                                    >
                                        {{
                                            form.minuites_before_calculate_allday_deduct
                                        }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors
                                                .minuites_before_calculate_allday_deduct
                                        "
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses"  v-show="form.attendance_method == 2">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{
                                        $t(
                                            "general.sanctions value first abcence"
                                        )
                                    }}
                                </th>
                                <td @click="editTab(23)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                    type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 23"
                                        v-model="
                                            form.sanctions_value_first_abcence
                                        "
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 23"
                                    >
                                        {{
                                            form.sanctions_value_first_abcence
                                        }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors
                                                .sanctions_value_first_abcence
                                        "
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses" v-show="form.attendance_method == 2">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{
                                        $t(
                                            "general.sanctions value second abcence"
                                        )
                                    }}
                                </th>
                                <td @click="editTab(24)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                    type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 24"
                                        v-model="
                                            form.sanctions_value_second_abcence
                                        "
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 24"
                                    >
                                        {{
                                            form.sanctions_value_second_abcence
                                        }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors
                                                .sanctions_value_second_abcence
                                        "
                                    />
                                </td>
                            </tr>

                            <tr :class="trClasses" v-show="form.attendance_method == 2">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{
                                        $t(
                                            "general.sanctions value third abcence"
                                        )
                                    }}
                                </th>
                                <td @click="editTab(25)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                    type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 25"
                                        v-model="
                                            form.sanctions_value_third_abcence
                                        "
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 25"
                                    >
                                        {{
                                            form.sanctions_value_third_abcence
                                        }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors
                                                .sanctions_value_third_abcence
                                        "
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses" v-show="form.attendance_method == 2">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{
                                        $t(
                                            "general.sanctions value fourth abcence"
                                        )
                                    }}
                                </th>
                                <td @click="editTab(26)" :class="tdClasses">
                                    <Input
                        class="dialog-input"
                                    type="number"
                                        v-on:keyup.enter="tab = 0"
                                        v-show="tab == 26"
                                        v-model="
                                            form.sanctions_value_fourth_abcence
                                        "
                                    />

                                    <span
                                        :class="spanClasses"
                                        v-show="tab !== 26"
                                    >
                                        {{
                                            form.sanctions_value_fourth_abcence
                                        }}</span
                                    >
                                    <InputError
                                        class="flex justify-start"
                                        :message="
                                            props.errors
                                                .sanctions_value_fourth_abcence
                                        "
                                    />
                                </td>
                            </tr>
                            <tr :class="trClasses">
                                <th @click="editTab(0)" :class="thClasses">
                                    {{ $t("general.activate system event logs") }}
                                </th>
                                <td @click="editTab(27)" :class="tdClasses">
                                    <button
                                        class="border-transparent capitalize tracking-wider focus:outline-none transition ease-in-out duration-150 rounded focus:border-white focus:shadow-outline-gray px-2 text-white font-normal shadow-md border  text-shadow-none hover:scale-110 truncate"
                                        :class="ActiveMonitorcolor"
                                        @click="changeAlertMonitorStatus"
                                    >
                                        <h6
                                            class="mb-0 leading-normal text-size-sm text-zinc-100 font-normal"
                                        >
                                            {{
                                                form.active_monitoring == true
                                                    ? $t("general.yes")
                                                    : $t("general.no")
                                            }}
                                        </h6>
                                    </button>

                                    <InputError
                                        class="flex justify-start"
                                        :message="props.errors.active_monitoring"
                                    />
                                </td>
                            </tr>
                            
                                                   
                            <tr
                                v-show="props?.item?.updated_by_user?.name"
                                :class="trClasses"
                            >
                                <th @click="editTab(0)" :class="thClasses">
                                    {{ $t("general.last update date") }}
                                </th>
                                <td
                                    :class="tdClasses"
                                    class="grid grid-cols-1 items-center"
                                >
                                    <span
                                        class="text-sm text-yellow-200 rtl:ml-5 ltr:mr-5"
                                    >
                                        {{ props?.item?.updated_at_formatted }}
                                    </span>
                                    <span>
                                        {{ $t("general.by") }} :
                                        <span class="text-sm text-orange-400">
                                            {{
                                                props?.item?.updated_by_user
                                                    ?.name
                                            }}
                                        </span>
                                    </span>
                                </td>
                            </tr>

                        </div>

                        <div>   <tr :class="trClasses">
                                <th
                                    @click="editTab(0)"
                                    class="px-3 py-3 font-normal rtl:text-right ltr:text-left capitalize bg-transparent shadow-none text-size-xs tracking-none whitespace-nowrap text-slate-200 opacity-90 align-middle"
                                >
                                    {{ $t("general.logo") }}
                                </th>
                                <td @click="editTab(27)" :class="tdClasses">
                                    <label class="rounded cursor-pointer">
                                        <div class="h-full">
                                            <input
                                                class="hidden py-3 mx-5 bg-black cursor-pointer"
                                                type="file"
                                                @input="
                                                    form.logo =
                                                        $event?.target?.files[0]
                                                "
                                                @change="loadFile($event)"
                                            />

                                            <div
                                                v-show="
                                                    !currentLogo && !form.logo
                                                "
                                                class="w-full text-yellow-300 align-middle"
                                            >
                                                {{
                                                    $t(
                                                        "general.press here to choose an image"
                                                    )
                                                }}
                                            </div>

                                            <img
                                                v-show="currentLogo"
                                                style="border-radius: 5%"
                                                id="output"
                                                :src="currentLogo"
                                                width="200"
                                                class="shadow-lg rounded p-1 max-h-120"
                                            />
                                        </div>
                                    </label>
                                    <InputError
                                        class="flex justify-start"
                                        :message="props.errors.logo"
                                    />
                                </td>
                            </tr>
</div>

                        <tr
                            v-show="save_changes_button"
                            class="flex justify-center my-2 bg-linear-to-l via-red-800/80"
                        >
                            <Button
                                @click="submit()"
                                class="text-md items-center px-6 hover:cursor-pointer rounded-full"
                                variant="linear_orange"
                                >{{ $t("general.save changes") }}</Button
                            >
                        </tr>
                    </thead>
                </table>
            </Card>
        </Container>
    </AppLayout>

    <!-- <DialogModal :show="dialogModal" @close="closeDialogModal" maxWidth="xs">
        <template #title>
            {{ $t("general.weekend") }}
        </template>

        <template #content>
            <div class="flex justify-center items-center">
                <ul class=" ">
                    <li
                        v-for="(day, index) in weekendDaysList"
                        :key="index"
                        class="text-yellow-100 font-normal text-md py-1 bg-zinc-900/60 outline outline-1 outline-gray-400/50 rounded-lg mt-2"
                    >
                        <label
                            :for="day.name"
                            class="w-28 flex justify-start items-center"
                        >
                            <input
                                type="checkbox"
                                :id="day.name"
                                :value="day.name"
                                v-model="form.weekendDays"
                                :checked="companyWeekendDays.includes(day.name)"
                                class="rounded mx-2 text-yellow-600 dark:text-slate-400/10 dark:border-gray-300/50 checked:border-gray-100/50 border dark:bg-black/40 border-gray-300 shadow-sm focus:ring-indigo-500 checked:hover:border-gray-200"
                            />

                            {{ $t("general." + day.name + "") }}
                        </label>
                    </li>
                </ul>
            </div>

            <hr class="h-px mt-2 bg-black/50 bg-linear-horizontal-dark" />
            <div class="flex justify-center mt-2">
                <button
                    @click="dialogModal = false"
                    type="submit"
                    class="mb-2 px-5 py-0.5 rounded-full text-white bg-linear-to-l from-orange-800 to-orange-500 hover:from-orange-900 hover:to-orange-500 border-orange-100 duration-300 capitalize tracking-wider ease-in-out hover:scale-110 shadow-black drop-shadow-2xl shadow-2xl border text-sm"
                >
                    {{ $t("general.close") }}
                </button>
            </div>
        </template>
    </DialogModal> -->

</template>
