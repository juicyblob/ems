<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useEmployeeStore } from '../stores/employee.store';
import Button from './ButtonDefault.vue';
import { computed, onMounted, ref, watch } from 'vue';
import CategoryCard from './CategoryCard.vue';
import CategoryFilters from './CategoryFilters.vue';
import CategoryHeader from './CategoryHeader.vue';
import Employee from './Employee.vue';

const store = useEmployeeStore();
const route = useRoute();
const router = useRouter();
const showEmployeeDetails = ref<boolean>(false);

onMounted( async () => {
    const alias = route.path.replace('/employees/', '');
    await store.fetchEmployees('all');
    await store.getEmpoyeesByAlias(alias);
});

onBeforeRouteUpdate((_to, _from, next) => {
    showEmployeeDetails.value = false;
    next();
});

const alias = computed(() => {
    return route.path.replace('/employees/', '');
});

watch(alias, async (newAlias) => {
    await store.getEmpoyeesByAlias(newAlias);
});

async function selectEmployee(id: number) {
    await store.getEmployeeById(id);
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
                v-for="employee in store.categoryEmployees"
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
    <Employee v-else :employee="store.selectEmployee" @backward="() => showEmployeeDetails = false"/>
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