<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useCategoryStore } from '../stores/category.store';

    const store = useCategoryStore();

    onMounted(async () => {
        await store.fetchCategories();
    });
</script>

<template>
    <nav class="categories">
        <RouterLink
        active-class="active"
        class="categories__link" 
        :to="`/employees/${cat.alias}`"
        v-for="cat in store.categories"
        :key="cat.id"
        >
        {{ cat.name }}
        </RouterLink>
    </nav>
</template>

<style scoped lang="scss">
    .categories {
        display: flex;
        flex-direction: column;
        gap: 40px;
        margin-top: 35%;

        &__link {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: var(--color-white);
            opacity: 0.7;
            transition: opacity .3s ease;

            &::before {
                content: '';
                display: block;
                width: 10px;
                height: 10px;
                border-radius: 2px;
                background-color: var(--color-white);
                margin-right: 9px;
            }

            &:hover {
                opacity: 0.8;
            }

            &.active {
                opacity: 1;
            }

            &:last-child {
                margin-top: 30px;
            }

            @media (max-width: 1280px) {
                font-size: 14px;
            }
        }

        @media (max-width: 1280px) {
            margin-top: 25%;
            gap: 32px;
        }
    }
</style>