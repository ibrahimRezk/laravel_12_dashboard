import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general', {
    state: () => ({
        animate: false,
    }), 
    persist: true,
})
