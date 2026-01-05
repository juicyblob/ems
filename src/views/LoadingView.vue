<script setup lang="ts">
import { VueSpinner } from 'vue3-spinners';
import IconLogo from '../assets/svg/IconLogo.vue';
import { useEmployeeStore } from '../stores/employee.store';
import { USER_ID_KEY } from '../utils/constants';
import { useRouter } from 'vue-router';

let userId = localStorage.getItem(USER_ID_KEY);
const router = useRouter();

async function checkEmployeesData() {
    const store = useEmployeeStore();
    if (!userId && store.employees?.length == 0) {
        try {
            store.uploadDemoEmployees();
        } catch (e) {
            console.error(e);
        } finally {
            setTimeout(() => {
                router.push({ name: 'employee-list', params: { alias: 'all'}});
            }, 1000);
        }
        
    } else {
        setTimeout(() => {
            router.push({ name: 'employee-list', params: { alias: 'all'}});
        }, 1000);
    }
}

checkEmployeesData();


</script>

<template>
    <div class="loading-box">
        <div class="loading-box__content">
            <IconLogo />
            <VueSpinner size="30" color="white" />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .loading-box {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        background-color: var(--color-blue);

        &__content {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .vue-spinner {
                margin: 32px auto 0 auto;
            }
        }
    }
</style>