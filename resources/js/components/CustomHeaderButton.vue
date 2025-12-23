<script setup lang="ts">
import Dropdown from '@/components/Dropdown.vue';
import FilterIcon from '@/components/Icons/Filter.vue';
import { computed, ref } from 'vue';
import Button from './ui/button/Button.vue';

const props = defineProps({
    width: {
        type: String,
        default: '36',
    },
    variant: {
        type: String,
        default: 'linear_orange',
    },
    size: {
        type: String,
        default: 'xs',
    },
    title: {
        type: String,
        default: 'headers',
    },
    iconType: {
        type: String,
        default: '',
    },
    button_title: {
        type: String,
        default: 'show headers',
    },
    showTitle: {
        type: Boolean,
        default: true,
    },
    keepOpened: {
        type: Boolean,
        default: false,
    },
});

const contentClasses = ref([
    'py-2 rtl:bg-linear-to-r ltr:bg-linear-to-l from-orange-600 to-gray-900',
]);

const direction = computed(() => {
    if (document.getElementsByTagName('html')[0].getAttribute('lang') == 'ar')
        return 'right';
    else return 'left';
});
</script>

<template>
    <Dropdown
        :align="direction"
        :width="props.width"
        :keepOpened="keepOpened"
        :contentClasses="props.showTitle == true ? contentClasses : ''"
    >
        <template #trigger>
            <span class="inline-flex rounded-md">
                <Button
                    class="flex justify-center hover:cursor-pointer"
                    type="button"
                    :size="props.size"
                    :variant="props.variant"
                >
                    {{ $t('general.' + props.button_title) }}
                    <FilterIcon
                        v-if="props.iconType == 'filter'"
                        class="ltr:ml-2 rtl:mr-2"
                    />
                </Button>
            </span>
        </template>

        <template #content>
            <div
                v-show="props.showTitle"
                class="flex justify-center px-4 py-1 text-xs text-gray-200"
            >
                {{ $t('general.' + props.title) }}
            </div>
            <div v-show="props.showTitle" class="border-t border-gray-200" />

            <slot />
            <div
                :class="
                    props.color == 'linear_orange'
                        ? 'from-orange-400'
                        : 'from-zinc-900'
                "
                class="flex flex-col justify-between to-gray-800 ltr:bg-linear-to-l rtl:bg-linear-to-r"
            >
                <slot name="checkedItemHeader"> </slot>
            </div>

            <div v-show="props.showTitle" class="border-t border-gray-100" />
        </template>
    </Dropdown>
</template>
