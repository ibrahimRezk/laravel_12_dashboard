<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { wTrans } from "laravel-vue-i18n";

import Card from "@/Components/Card/Card.vue";
import InputGroup from "@/Components/InputGroup.vue";
import SelectGroup from "@/Components/SelectGroup.vue";

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({}),
    },

    isLoading: {
        type: Boolean,
        default: false,
    },
    noPadding: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(["update:modelValue", "filtersValuesData"]);

const filters = ref({ ...props.modelValue });
const filtersValuesData = ref({});

watch(
    filters,
    () => {
        prepairFiltersValuesData.value;
        emits("update:modelValue", filters.value);
        emits("filtersValuesData", filtersValuesData.value);
    },
    {
        deep: true,
    }
);

onMounted(() => {
    // if(Object.keys(props.modelValue).length){
    // filters.value = { ...props.modelValue };
    prepairFiltersValuesData.value;
    emits("filtersValuesData", filtersValuesData.value);
    // }
});

const prepairFiltersValuesData = computed(() => {
    filtersValuesData.value[name] = {
        id: "name",
        data: filters.value.name,
    };


});


//
const name = "name";

</script>

<template>
    <Card
        class="from-black via-zinc-700 to-zinc-900"
        :is-loading="isLoading"
        noPadding
    >
        <form>
            <InputGroup
                :label="`${$t('general.' + name)}`"
                v-model="filters.name"
            />

        </form>
    </Card>
</template>
