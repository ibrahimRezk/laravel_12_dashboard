import { ref } from "vue";
import { router } from "@inertiajs/vue3";
import { trans } from "laravel-vue-i18n";
import { usePage } from "@inertiajs/vue3";



const itemToDelete = ref([]);
const deleteModal = ref(false);
const deleteMultipleItems = ref(false);
const isDeleting = ref(false);
const ids = ref([]);
const destroyRoute = ref();
const method = ref();

export default function (params) {

    const { destroyRoute: thedestroyRoute, method: calledMethod } =
    params;
    
    destroyRoute.value = thedestroyRoute
    method.value = calledMethod ?? "destroy"
    


    // console.log(destroy.url)

    const current_lang = document
        .getElementsByTagName("html")[0]
        .getAttribute("lang");

    function close() {
        deleteModal.value = false;
        itemToDelete.value = [];
        ids.value = [];
        deleteMultipleItems.value = false;
        // itemToDelete.value = {};
    }


    function showDeleteModal(item) {
        deleteModal.value = true;
        itemToDelete.value = []
        ids.value = []
        if (deleteMultipleItems.value == true) {
            itemToDelete.value = item;
            itemToDelete.value.forEach((id) => ids.value.push(id));
        } else {
            itemToDelete.value.push(item);
            ids.value.push(item.id);
        }
    }

    function handleDeleteItem() {

// console.log('llll')
// console.log(ids.value)

        router.delete(destroyRoute.value.url(`${ids.value}`) ,
        // router.delete(

            // route(`${destroyRoute.value}.${method.value}`, {
            //     id: ids.value,
            // }),


            {
                preserveScroll: true,
                preserveState: true,
                onBefore: () => {
                    isDeleting.value = true;
                },
                onSuccess: () => {
                    console.log('success')
                    deleteModal.value = false;
                    itemToDelete.value = [];
                    ids.value = [];
                    deleteMultipleItems.value = false;

                    // itemToDelete.value = {};

                    // Toast.fire({
                    //   // toast: true,
                    //   position: current_lang == 'ar'? 'top-start' : 'top-end',
                    //   icon: "success",
                    //   title: method.value == 'destroy' ? trans('general.item deleted successfully') : trans('general.Item Rolled back successfully'),

                    //     iconColor: 'white',
                    //     color:'black',  // text color
                    //     // background: '#1cac78        ', // green
                    //     // background: '#00a877       ', // green
                    //     // background: '#39ff14   ', // lime
                    //     // background: '#dc143c    ', // red
                    //     // background: "#B8860B        ", // gold

                    //     background: method.value == 'destroy' ? '#dc143c' : '#B8860B', // red
                    // });
                },
                onFinish: () => {
                    isDeleting.value = false;
                    usePage().props.menus.forEach((menu) => {
                        menu.isActive
                            ? (menu.open = true)
                            : (menu.open = false);
                    });
                },
            }
        );
    }

    return {
        deleteModal,
        itemToDelete,
        isDeleting,
        showDeleteModal,
        deleteMultipleItems,
        handleDeleteItem,
        close,

    };
}
