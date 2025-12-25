<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { trans } from 'laravel-vue-i18n';
import { ref, watch } from 'vue';

import type { FlashMessages } from '@/types';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const direction = ref(
    document.getElementsByTagName('html')[0].getAttribute('dir'),
);

const props = withDefaults(
    defineProps<{
        success: FlashMessages['success'];
        error: FlashMessages['error'];
    }>(),
    {
        success: () => '',
        error: () => '',
    },
);


const page = usePage() 
const messages = <FlashMessages>page.props.messages


watch(
    () => messages?.success,
    (successMessage) => {
        if (successMessage !== null && successMessage !== '') {
            toast(trans(`general.${successMessage}`), {
                ////////////////////
                type: toast.TYPE.SUCCESS, /////////////////////
                autoClose: 2500,
                theme: 'colored',
                position:
                    direction.value == 'ltr'
                        ? toast.POSITION.TOP_RIGHT
                        : toast.POSITION.TOP_LEFT,
                rtl: direction.value == 'ltr' ? false : true,
                transition: 'bounce', // flip , slide , zoom , bounce
                hideProgressBar: false,
                pauseOnHover: true,
            });
        }

        // setTimeout(() => {
        //     props.messages.success = '';
        // }, 100);
    },
    {
        immediate: true,
    },
);
watch(
    () => props.success,
    (successMessage) => {
        if (successMessage !== null && successMessage !== '') {
            toast(trans(`general.${successMessage}`), {
                ////////////////////
                type: toast.TYPE.SUCCESS, /////////////////////
                autoClose: 2500,
                theme: 'colored',
                position:
                    direction.value == 'ltr'
                        ? toast.POSITION.TOP_RIGHT
                        : toast.POSITION.TOP_LEFT,
                rtl: direction.value == 'ltr' ? false : true,
                transition: 'bounce', // flip , slide , zoom , bounce
                hideProgressBar: false,
                pauseOnHover: true,
            });
        }

        // setTimeout(() => {
        //     upage.props.messages.success = '';
        // }, 100);
    },
    {
        immediate: true,
    },
);

watch(
    () => messages?.error,
    (errorMessage) => {
        if (errorMessage !== null && errorMessage !== '') {
            toast(trans(`general.${errorMessage}`), {
                ////////////////////
                type: toast.TYPE.ERROR, /////////////////////
                autoClose: 2500,
                theme: 'colored',
                position:
                    direction.value == 'ltr'
                        ? toast.POSITION.TOP_RIGHT
                        : toast.POSITION.TOP_LEFT,
                rtl: direction.value == 'ltr' ? false : true,
                transition: 'bounce', // flip , slide , zoom , bounce
                hideProgressBar: false,
                pauseOnHover: true,
            });
        }

        // setTimeout(() => {
        //     upage.props.messages.error = '';
        // }, 100);
    },
    {
        immediate: true,
    },
);

watch(
    () => props.error,
    (errorMessage) => {
        if (errorMessage !== null && errorMessage !== '') {
            toast(trans(`general.${errorMessage}`), {
                ////////////////////
                type: toast.TYPE.ERROR, /////////////////////
                autoClose: 2500,
                theme: 'colored',
                position:
                    direction.value == 'ltr'
                        ? toast.POSITION.TOP_RIGHT
                        : toast.POSITION.TOP_LEFT,
                rtl: direction.value == 'ltr' ? false : true,
                transition: 'bounce', // flip , slide , zoom , bounce
                hideProgressBar: false,
                pauseOnHover: true,
            });
        }

        // setTimeout(() => {
        //     upage.props.messages.error = '';
        // }, 100);
    },
    {
        immediate: true,
    },
);
</script>
<template>
    <div/>
</template>
