<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useEmployeeStore } from '../stores/employee.store';
import Button from './Button.vue';
import { computed, onMounted, watch } from 'vue';
import CategoryCard from './CategoryCard.vue';
import CategoryFilters from './CategoryFilters.vue';
import CategoryHeader from './CategoryHeader.vue';

const store = useEmployeeStore();
const route = useRoute();

onMounted( async () => {
    const alias = route.path.replace('/', '');
    await store.fetchEmployees('all');
    await store.getEmpoyeesByAlias(alias);
});

const alias = computed(() => {
    return route.path.replace('/', '');
});

watch(alias, async (newAlias) => {
    await store.getEmpoyeesByAlias(newAlias);
});

</script>

<template>
    <div class="category">
        <CategoryHeader />
        <div class="category__buttons">
            <Button text="Выгрузить в Excel" color="blue" txt-color="white"/>
            <Button text="Добавить сотрудника" color="yellow" txt-color="dark"/>
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
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .category {
        padding: 137px 60px 150px 60px;
        

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