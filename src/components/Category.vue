<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useEmployeeStore } from '../stores/employee.store';
import Button from './ButtonDefault.vue';
import { computed, onMounted, ref, watch } from 'vue';
import CategoryCard from './CategoryCard.vue';
import CategoryFilters from './CategoryFilters.vue';
import CategoryHeader from './CategoryHeader.vue';
import Employee from './Employee.vue';
import Notification from './Notification.vue';
import { useNotificationStore } from '../stores/notification.store';

const storeEmployee = useEmployeeStore();
const storeNotification = useNotificationStore();
const route = useRoute();
const router = useRouter();
const showEmployeeDetails = ref<boolean>(false);

onMounted( async () => {
    const alias = route.path.replace('/employees/', '');
    await storeEmployee.fetchEmployees('all');
    await storeEmployee.getEmpoyeesByAlias(alias);
});

onBeforeRouteUpdate((_to, _from, next) => {
    showEmployeeDetails.value = false;
    next();
});

const alias = computed(() => {
    return route.path.replace('/employees/', '');
});

watch(alias, async (newAlias) => {
    await storeEmployee.getEmpoyeesByAlias(newAlias);
});

async function selectEmployee(id: number) {
    await storeEmployee.getEmployeeById(id);
    showEmployeeDetails.value = true;
}

function openAddForm() {
    router.push({ name: 'employee-new' });
}

</script>

<template>
    <div class="category" v-if="!showEmployeeDetails">
        <CategoryHeader />
        <div class="category__buttons">
            <Button text="Выгрузить в Excel" color="blue" txt-color="white" />
            <Button text="Добавить сотрудника" color="yellow" txt-color="dark" @click="openAddForm" />
        </div>
        <div class="category__employees">
            <CategoryFilters />
            <div class="category__cards">
                <CategoryCard
                v-for="employee in storeEmployee.categoryEmployees"
                :key="employee.id"
                :photo="employee.photo"
                :name="employee.name"
                :position="employee.position"
                :mail="employee.email"
                :id="employee.id ?? 0"
                @select-employee="selectEmployee"
                />
            </div>
        </div>
    </div>
    <Employee 
    v-else 
    :employee="storeEmployee.selectEmployee" 
    @backward="() => showEmployeeDetails = false"
    />
    <Notification :show="storeNotification.show" :text="storeNotification.message" />
</template>

<style scoped lang="scss">
    .category {
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