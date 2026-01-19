<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useArchiveStore } from '../stores/archive.store';
import ArchiveCard from './ArchiveCard.vue';
import ButtonDefault from './ButtonDefault.vue';
import CategoryFilters from './CategoryFilters.vue';
import { useCategoryStore } from '../stores/category.store';
import PopUpConfirm from './PopUpConfirm.vue';
import { notifications, type ModalAction } from '../utils/constants';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '../stores/notification.store';
import { useEmployeeStore } from '../stores/employee.store';
import Notification from './Notification.vue';

const storeArchive = useArchiveStore();
const storeCategory = useCategoryStore();
const storeNotification = useNotificationStore();
const storeEmployee = useEmployeeStore();
const router = useRouter();
const counter = computed(() => {
    if (storeCategory.categoryStats) {
        return storeCategory.categoryStats['archive'];
    }
});
const popUpIsOpened = ref<boolean>(false);
const popUpTitle = ref<string>('');
const popUpText = ref<string>('');
const popUpHasName = ref<boolean>(true);
const popUpEmployeeName = ref<string>('');
const popUpMode = ref<ModalAction>();

onMounted( async () => {
    await storeArchive.fetchEmployees();
});

function resetData() {
    popUpTitle.value = '';
    popUpText.value = '';
    popUpEmployeeName.value = '';
    popUpMode.value = undefined;
    popUpHasName.value = true;
    storeArchive.selectEmployeeId = 0;
    storeArchive.selectEmployeeDepartment = '';
}

function popUpOpen(title: string, text: string, name: string, mode: ModalAction, id: number, department: string) {
    document.body.style.overflow = 'hidden';
    popUpTitle.value = title;
    popUpText.value = text;
    popUpEmployeeName.value = name;
    popUpMode.value = mode;
    storeArchive.selectEmployeeId = id;
    storeArchive.selectEmployeeDepartment = department;
    popUpIsOpened.value = true;
}

function openConfirmClear(mode: ModalAction) {
    document.body.style.overflow = 'hidden';
    popUpTitle.value = 'Вы собираетесь очистить архив';
    popUpText.value = 'Подтверждаете операцию?';
    popUpHasName.value = false;
    popUpMode.value = mode;
    popUpIsOpened.value = true;
}

function popUpClose() {
    popUpIsOpened.value = false;
    setTimeout(() => {
        document.body.style.overflow = '';
        resetData();
    }, 500);
}

async function popUpAction() {
    try {
        if (popUpMode.value == 'restore') {
            await storeArchive.restoreEmployee(storeArchive.selectEmployeeId);
            await storeEmployee.fetchEmployees('all');
            await storeEmployee.getEmpoyeesByAlias(storeArchive.selectEmployeeDepartment);

            router.push({ name: 'employee-list', params: { alias: storeArchive.selectEmployeeDepartment }});
            storeNotification.showNotification(notifications.archive.restore);

        } else if (popUpMode.value == 'remove') {
            await storeArchive.removeEmployee(storeArchive.selectEmployeeId);
            await storeArchive.fetchEmployees();
            await storeCategory.getCategoryCounters();

            storeNotification.showNotification(notifications.archive.removed);

        } else if (popUpMode.value == 'clear') {
            await storeArchive.clearArchive();
            await storeArchive.fetchEmployees();
            await storeCategory.getCategoryCounters();

            storeNotification.showNotification(notifications.archive.clear);
        }

    } catch (err) {
        if (err instanceof Error) {
            storeNotification.showNotification(`${notifications.error.some}: ${err.message}`);
        }
    } finally {
        document.body.style.overflow = '';
        popUpClose();
    }
    
}

</script>

<template>
    <div class="archive">
        <div class="archive__head">
            <h1 class="archive__head-title">Архив</h1>
            <div class="archive__head-counter">{{ counter }}</div>
        </div>
        <div class="archive__buttons">
            <ButtonDefault text="Очистить архив" color="red" txt-color="white" @click="openConfirmClear('clear')" />
        </div>
        <div class="archive__employees">
            <CategoryFilters mode="archive" />
            <div class="archive__cards">
                <ArchiveCard 
                v-for="employee in storeArchive.employees"
                :key="employee.id"
                :photo="employee.photo"
                :name="employee.name"
                :position="employee.position"
                :mail="employee.email"
                :id="employee.id ?? 0"
                :department="employee.department"
                @open-popup="popUpOpen"
                />
            </div>
        </div>
    </div>
    <PopUpConfirm 
    :open="popUpIsOpened"
    :title="popUpTitle"
    :has-name="popUpHasName"
    :name="popUpEmployeeName"
    :text="popUpText"
    @cancel="popUpClose"
    @ok="popUpAction"
    />
    <Notification :show="storeNotification.show" :text="storeNotification.message" />
</template>

<style scoped lang="scss">
    .archive {
        padding-bottom: 80px;
        &__head {
            display: flex;
            gap: 20px;
            font-weight: 500;
            font-size: 32px;

            &-counter {
                color: var(--color-gray);
            }
        }

        &__buttons {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 24px;
            margin-top: 40px;
        }

        &__employees {
            margin-top: 35px;
        }

        &__cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(238px, 263px));
            gap: 22px;
        }
    }
</style>