<script setup>
import {  computed , ref } from "vue";
import Dropdown from "@/Components/Dropdown.vue";
import Button from "./ui/button/Button.vue";
import FilterIcon from "@/Components/Icons/Filter.vue";





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

});



const contentClasses = ref([
    "py-2 rtl:bg-linear-to-r ltr:bg-linear-to-l from-orange-600 to-gray-900"
])

const direction = computed(() => {
    if (document.getElementsByTagName("html")[0].getAttribute("lang") == "ar")
        return "right";
    else return "left";
});


</script>

<template>

        <Dropdown 
           
            :align="direction"
            :width="props.width"
            :keepOpened = true
            :contentClasses= "props.showTitle == true ? contentClasses : '' "
            
        >
            <template #trigger>
                <span class="inline-flex rounded-md " >
                    <Button class="flex justify-center   " type="button" :size="props.size" :variant="props.variant">
                        {{ $t("general." + props.button_title) }}
                        <FilterIcon v-if="props.iconType == 'filter'" class="rtl:mr-2 ltr:ml-2" />
                        </Button
                    >
                </span>
            </template>
    
            <template #content>
                <div v-show="props.showTitle"
                    class="flex justify-center px-4 py-1 text-xs text-gray-200 "
                >
                    {{ $t("general." + props.title) }}
    
                </div>
                <div v-show="props.showTitle" class="border-t border-gray-200" />
    
    
                <slot/> 
                <div
                :class="props.color == 'linear_orange' ?  'from-orange-400' : 'from-zinc-900' "
                
                class="flex flex-col justify-between rtl:bg-linear-to-r ltr:bg-linear-to-l  to-gray-800"
                >
                    <slot name="checkedItemHeader"> </slot>
                </div>
    
                <div v-show="props.showTitle" class="border-t border-gray-100" />
            </template>
        </Dropdown>
</template>
