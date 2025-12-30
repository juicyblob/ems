<script setup lang="ts">
import { useEmployeeStore } from '../stores/employee.store';

    const filters = [
        { name: 'По дате', query: 'date'},
        { name: 'По возрасту', query: 'age'},
        { name: 'По окладу', query: 'salary'}
    ];

    const store = useEmployeeStore();

    function changeSort(query: string) {
        store.currentSort = query;
    }
    
</script>

<template>
    <div class="category__filters">
        <button
        class="category__filter"
        v-for="filter in filters"
        :key="filter.query"
        :class="filter.query == store.currentSort ? 'active' : ''"
        @click="changeSort(filter.query)"
        >
        {{ filter.name }}
        </button>
    </div>
</template>

<style scoped lang="scss">
    .category__filters {
        display: flex;
        align-items: center;
        gap: 16px;
        font-family: var(--font-family);
        margin-bottom: 32px;
    }

    .category__filter {
        border: none;
        outline: none;
        appearance: none;
        cursor: pointer;
        background: transparent;
        font-size: 14px;
        line-height: 20px;
        padding: 0;
        color: var(--color-gray);

        &.active {
            color: var(--color-dark);
            font-weight: 600;
            border-bottom: 2px solid var(--color-dark);
        }
    }
</style>