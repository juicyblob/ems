import { defineStore } from "pinia";
import { ref } from "vue";


export const useNotificationStore = defineStore('notification', () => {
    const show = ref<boolean>(false);
    const message = ref<string>('');

    function showNotification(text: string) {
        show.value = true;
        message.value = text;
        setTimeout(() => {
            show.value = false;
        }, 2000);
    }

    return { show, message, showNotification };
});