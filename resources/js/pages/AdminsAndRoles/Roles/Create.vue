<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { Head, useForm, Link } from "@inertiajs/vue3";
import { router } from "@inertiajs/vue3";
import useHeaders from "@/Composables/useHeaders.js";
import Layout from "@/Layouts/Authenticated.vue";

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
// import Filters from "./Filters.vue";
import CustomHeaderButton from "@/Components/CustomHeaderButton.vue";

import useDeleteItem from "@/Composables/useDeleteItem.js";
// import useFilters from "@/Composables/useFilters.js";
import InputError from "@/Components/InputError.vue";
import Permissions from "./Permissions.vue";
import BreadCrumbs from "@/Components/BreadCrumbs.vue";

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
        default: () => ({}),
    },
    pagesPermissions: {
        type: Array,
        default: () => [],
    },
    // specialPermissions: {
    //     type: Array,
    // },
    routeResourceName: {
        type: String,
        required: true,
    },
    errors: {
        type: Object,
        default: () => {},
    },
    // permissions: {
    //     type: Array,
    // },
    breadcrumbs: {
        type: [Array, Object],
        default: [{}],
    },
});

const form = useForm({
    name: props.item.name ?? "",
    slug: {
        ar: props.item !== null ? props?.item["slug.ar"] : "",
        en: props.item !== null ? props?.item["slug.en"] : "",
    },
});

watch(
    () => form.slug.en,
    () => (form.name = form.slug.en)
);

const submit = () => {
    props.edit
        ? form.put(
              route(`${props.routeResourceName}.update`, {
                  id: props.item.id,
              })
          )
        : form.post(route(`${props.routeResourceName}.store`));
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

        <Container
            :animate="animate"
            class="from-black via-orange-200 to-black"
        >
            <div
                class="px-5 py-1 border border-zinc-300 rounded-lg rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-blue-300/20 shadow-md via-yellow-100/20 to-blue-300/20"
            >
                <form @submit.prevent="submit">
                    <div class="grid md:grid-cols-7 gap-3 mt-2">
                        <Button
                            class="md:col-span-3"
                            type="button"
                            color="transparent_red"
                        >
                            <Label>
                                <div class="flex items-start">
                                    {{ $t("general.name in arabic") }}
                                </div>
                            </Label>

                            <Input
                                type="text"
                                class="mt-1 block w-full text-black"
                                v-model="form.slug.ar"
                                required
                            />
                            <InputError
                                    class="mt-1"
                                    :error-message="props.errors['slug.ar']"
                                />
                        </Button>

                        <Button
                            class="md:col-span-3"
                            type="button"
                            color="transparent_red"
                        >
                            <Label>
                                <div class="flex items-start">
                                    {{ $t("general.name in english") }}
                                </div>

                                <Input
                                    type="text"
                                    class="mt-1 block w-full text-black"
                                    v-model="form.slug.en"
                                    required
                                />
                            </Label>

                            <InputError
                                    class="mt-1"
                                    :error-message="props.errors['slug.en']"
                                />
                        </Button>
                        <div class=" w-full  flex justify-center ">
                            <button
                                :disabled="form.processing"
                                type="submit"
                                class="px-10 my-4 py-1 rounded-full text-white bg-gradient-to-l from-orange-800 to-orange-500 hover:from-orange-900 hover:to-orange-500 border-orange-100 duration-300 capitalize tracking-wider ease-in-out hover:scale-110 shadow-black drop-shadow-2xl shadow-2xl border text-sm"
                            >
                                {{
                                    form.processing
                                        ? $t("general.saving")
                                        : $t("general.save")
                                }}
                            </button>

                        </div>
                    </div>
                </form>
            </div>
            <Permissions
                v-if="edit && props.item.name != 'Super Admin'"
                :role="item"
                :pagesPermissions="props.pagesPermissions"
            />
        </Container>
    </Layout>
</template>
