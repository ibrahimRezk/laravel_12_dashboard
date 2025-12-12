<script setup lang="ts">
// import { usePage } from '@inertiajs/vue3'
import { ref, watch } from "vue";
import { trans } from "laravel-vue-i18n";

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const direction = ref(document.getElementsByTagName("html")[0].getAttribute("dir"))

interface messagesType {
    error: string;
    success: string;
    messages: {
        success: string;
        error: string;
        vital_error: string;
    }
}

const props = withDefaults(defineProps<messagesType>(), {
    success: '',
    error: '',
    messages: () => ({
        success: '',
        error: '',
        vital_error: '',
    })
});


watch(() => (props.messages?.success),
    (successMessage) => {

        if (successMessage !== null && successMessage !== "") {
            toast( trans(`general.${successMessage}`), { ////////////////////
                type: toast.TYPE.SUCCESS, /////////////////////
                autoClose: 2500,
                theme: 'colored',
                position: direction.value == 'ltr' ? toast.POSITION.TOP_RIGHT : toast.POSITION.TOP_LEFT,
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
    }
);
watch(() => (props.success),
    (successMessage) => {

        if (successMessage !== null && successMessage !== "") {
            toast( trans(`general.${successMessage}`), { ////////////////////
                type: toast.TYPE.SUCCESS, /////////////////////
                autoClose: 2500,
                theme: 'colored',
                position: direction.value == 'ltr' ? toast.POSITION.TOP_RIGHT : toast.POSITION.TOP_LEFT,
                rtl: direction.value == 'ltr' ? false : true,
                transition: 'bounce', // flip , slide , zoom , bounce
                hideProgressBar: false,
                pauseOnHover: true,
            });
        }

        // setTimeout(() => {
        //     usePage().props.messages.success = '';
        // }, 100);

    },
    {
        immediate: true,
    }
);




watch(
    () => (props.messages?.error ),
    (errorMessage) => {
        if (errorMessage !== null && errorMessage !== "") {
            toast( trans(`general.${errorMessage}`), { ////////////////////
                type: toast.TYPE.ERROR, /////////////////////
                autoClose: 2500,
                theme: 'colored',
                position: direction.value == 'ltr' ? toast.POSITION.TOP_RIGHT : toast.POSITION.TOP_LEFT,
                rtl: direction.value == 'ltr' ? false : true,
                transition: 'bounce', // flip , slide , zoom , bounce
                hideProgressBar: false,
                pauseOnHover: true,
            });
        }

        // setTimeout(() => {
        //     usePage().props.messages.error = '';
        // }, 100);

    },
    {
        immediate: true,
    }
);

watch(
    () => ( props.error),
    (errorMessage) => {
        if (errorMessage !== null && errorMessage !== "") {
            toast( trans(`general.${errorMessage}`), { ////////////////////
                type: toast.TYPE.ERROR, /////////////////////
                autoClose: 2500,
                theme: 'colored',
                position: direction.value == 'ltr' ? toast.POSITION.TOP_RIGHT : toast.POSITION.TOP_LEFT,
                rtl: direction.value == 'ltr' ? false : true,
                transition: 'bounce', // flip , slide , zoom , bounce
                hideProgressBar: false,
                pauseOnHover: true,
            });
        }

        // setTimeout(() => {
        //     usePage().props.messages.error = '';
        // }, 100);

    },
    {
        immediate: true,
    }
);


</script>


