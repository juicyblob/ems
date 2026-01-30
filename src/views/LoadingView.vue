<script setup lang="ts">
import { VueSpinner } from 'vue3-spinners';
import IconLogo from '../assets/svg/IconLogo.vue';
import { useEmployeeStore } from '../stores/employee.store';
import { useRouter } from 'vue-router';

const router = useRouter();
const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

async function checkEmployeesData() {
    const store = useEmployeeStore();
    if (store.employees?.length == 0) {
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

if (isDesktop) {
    checkEmployeesData();
}


</script>

<template>
    <div class="loading-box">
        <div class="loading-box__content">
            <IconLogo />
            <VueSpinner v-if="isDesktop" size="30" color="white" />
            <div v-else class="loading-box__notification">
                <h2 class="loading-box__notification-title">
                    Интерфейс недоступен на&nbsp;данном разрешении
                </h2>
                <p class="loading-box__notification-text">
                Система предназначена для работы на&nbsp;экранах шириной от&nbsp;1024px. Пожалуйста, откройте приложение на&nbsp;ноутбуке или компьютере.
                </p>
            </div>
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
            align-items: center;
            padding: 0 24px;

            .vue-spinner {
                margin: 32px auto 0 auto;
            }
        }

        &__notification {
            text-align: center;
            margin-top: 32px;
            color: var(--color-white);

            &-title {
                margin-bottom: 24px;
            }

            &-text {
                font-size: 18px;
                line-height: 1.7rem;
            }
        }
    }
</style>