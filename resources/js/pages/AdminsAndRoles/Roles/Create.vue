<script setup lang="ts">
import {  onMounted } from "vue";
import { Head, useForm, Form } from "@inertiajs/vue3";
import Container from "@/components/Container.vue";
import InputError from "@/components/InputError.vue";


import AppLayout from '@/layouts/AppLayout.vue';
import { type   BreadcrumbItem    ,fillFormType   } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RolesController from "@/actions/App/Http/Controllers/RolesController";
import {  store , update  } from '@/routes/roles'
import Label from "@/components/ui/label/Label.vue";
import Spinner from '@/components/ui/spinner/Spinner.vue';

import Permissions from "./Permissions.vue";


interface rolePermission {
    id: number,
    name: string
}

interface role {
    id?: number;
    name?: string;
    slug: {
        ar: string;
        en: string;
    };
    permissions: rolePermission[]

}



interface permission {
    id: number ,
    name:string ,
    permissions: string[]

}

interface Props {
    edit?: boolean;
    title?: string;
    // routeResourceName?: string;
    item?: role; 
    pagesPermissions?: permission[]; 
    // headers?: header[];
    // filters?: Record<string, any>;
    errors?: Record<string, any>;
    // method?: string;
    // can?: permissions;
}




// const props = defineProps<Props>()
const props = withDefaults(defineProps<Props>(), {
    edit: false,
    title: '',
    item: () => ({
       id: 0,
       name: '',
        slug: {
        ar: '',
        en: ''
    },
        permissions : []

    }),
    pagesPermissions: () => ([]),
    errors: () => ({}),

});



// const props = defineProps({
//     edit: {
//         type: Boolean,
//         default: false,
//     },
//     title: {
//         type: String,
//     },
//     item: {
//         type: Object,
//         default: () => ({}),
//     },
//     pagesPermissions: {
//         type: Array,
//         default: () => [],
//     },
//     // specialPermissions: {
//     //     type: Array,
//     // },
//     routeResourceName: {
//         type: String,
//         required: true,
//     },
//     errors: {
//         type: Object,
//         default: () => {},
//     },
//     // permissions: {
//     //     type: Array,
//     // },
//     breadcrumbs: {
//         type: [Array, Object],
//         default: [{}],
//     },
// });

const breadcrumb: BreadcrumbItem[] = [
    {
        title: props.title,
        href: RolesController.index(),
    },
];




// const form = useForm({
//     name: props.item.name ?? "",
//     slug: {
//         ar: props.item !== null ? props?.item["slug.ar"] : "",
//         en: props.item !== null ? props?.item["slug.en"] : "",
//     },
// });

// watch(
//     () => form.slug.en,
//     () => (form.name = form.slug.en)
// );

// const submit = () => {
//     props.edit
//         ? form.put(
//               route(`${props.routeResourceName}.update`, {
//                   id: props.item.id,
//               })
//           )
//         : form.post(route(`${props.routeResourceName}.store`));
// };

const currentItem:fillFormType = useForm({
    id : 0 ,
    name : 0 ,
    slug: {
        ar: '',
        en: '',
    },
});

const fillForm = (item:fillFormType) => {
    Object.keys(currentItem).forEach((key) =>
        item[key] !== undefined && key !== "slug" ? (currentItem[key] = item[key]) : ""
    );
    currentItem.slug.ar = item["slug.ar"];
    currentItem.slug.en = item["slug.en"];
};

onMounted(()=> props.edit ? fillForm(props.item) : '')


</script>

<template>
    <AppLayout :breadcrumbs="breadcrumb" :header=" props.edit ? 'edit role' : 'add new role'">
            <Head :title="props.title" />
            <Container>
            <div
                class="p-2  border border-zinc-300 rounded-lg rtl:bg-linear-to-r ltr:bg-linear-to-l from-blue-300/20 shadow-md via-yellow-100/20 to-blue-300/20"
            >
 <Form
            v-bind=" edit ? update.form(1) :  store.form()"
            disable-while-processing
            :show-progress="false"
            v-slot="{ errors, processing }"
            >
            
            <div class="grid md:grid-cols-7 gap-3  ">

                 <Input
                        hidden
                        id="name"
                        name="name"
                        v-model="currentItem.slug.en"
                    />
                        <div
                            class="md:col-span-3 grid  border border-gray-200/20 rounded p-2 bg-black/20"
                            type="button"
                            variant="transparent_red"
                        >
                            <Label>
                                <div class="flex items-start">
                                    {{ $t("general.name in arabic") }}
                                </div>
                            </Label>

                            <Input
                        class="dialog-input mt-2"
                        id="slug.ar"
                        name="slug.ar"
                        v-model="currentItem.slug.ar"
                    />
                            <InputError
                                    class="mt-1"
                                    :message="errors['slug.ar']"
                                />
                        </div>

                    <div
                            class="md:col-span-3 grid  border border-gray-200/20 rounded p-2 bg-black/20"
                            type="button"
                            variant="transparent_red"
                        >
                            <Label>
                                <div class="flex items-start">
                                    {{ $t("general.name in english") }}
                                </div>
                            </Label>

                            <Input
                        class="dialog-input mt-2"
                        id="slug.en"
                        name="slug.en"
                        v-model="currentItem.slug.en"
                    />
                            <InputError
                                    class="mt-1"
                                    :message="errors['slug.en']"
                                />
                        </div>
                        <div class=" w-full  flex justify-center items-center ">
                            <Button
                                class="px-10 my-4 py-1 rounded-full text-white bg-linear-to-l from-orange-800 to-orange-500 hover:from-orange-900 hover:to-orange-500 border-orange-100 duration-300 capitalize tracking-wider ease-in-out hover:scale-110 shadow-black drop-shadow-2xl shadow-2xl border text-sm hover:cursor-pointer"
                        variant="linear_orange"
                        size="md"
                        type="submit"
                        :disabled="processing"
                    >
                        <Spinner v-if="processing" />
                        Save
                    </Button>

                        </div>
                    </div>
                </Form>
            </div>
            <Permissions
                v-if="edit && props.item.name != 'Super Admin'"
                :item="item"
                :pagesPermissions="props.pagesPermissions"
            />
        </Container>
    </AppLayout>
</template>
