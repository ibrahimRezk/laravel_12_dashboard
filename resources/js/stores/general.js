import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('general', {
    state: () => ({
        animate: false,
        paginationNumber: 10,

    }), 
    persist: true,
})
