<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { useCategoryStore } from '../stores/category.store';
    import { computed, onMounted } from 'vue';

    const route = useRoute();
    const store = useCategoryStore();

    onMounted(async () => {
        await store.getCategoryCounters();
    });

    const alias = computed(() => {
        return route.path.replace('/employees/', '');
    });

    const counter = computed(() => store.categoryStats?.[alias.value]);

    const activeCategory = computed(() => {
        const category = store.categories?.find(cat => cat.alias == alias.value);
        return category?.name;
    });


</script>

<template>
    <div class="category-head">
        <h1 class="category-head__title">{{ activeCategory }}</h1>
        <div class="category-head__counter">{{ counter }}</div>
    </div>
</template>

<style scoped lang="scss">
    .category-head {
        display: flex;
        gap: 20px;
        font-weight: 500;
        font-size: 32px;

        &__counter {
            color: var(--color-gray);
        }
    }
    
</style>