<script setup lang="ts">
    import { VueSpinner } from 'vue3-spinners';

    const { show = false } = defineProps<{ show: boolean }>();
    
</script>

<template>
    <Teleport to="body">
        <div v-if="show" class="load">
            <div class="load__innder">
                <VueSpinner size="30" color="white" />
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
    .load {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: var(--color-overlay);
        z-index: 200;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>