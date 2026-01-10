<script setup lang="ts">

    const { show = false, text }= defineProps<{
        show: boolean,
        text: string
    }>();

</script>

<template>
   <Transition name="fade">
    <div v-show="show" class="notification">
        {{ text }}
    </div>
   </Transition>
</template>

<style scoped lang="scss">
    .notification {
        border-radius: 8px;
        padding: 18px 40px;
        font-size: 18px;
        color: var(--color-white);
        background-color: var(--color-notification);
        position: fixed;
        left: 50%;
        bottom: 46px;
        transform: translateX(-50%);
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .6s ease-out;
    }

    .fade-enter-from,
    .fade-leave.to {
        opacity: 0;
    }
</style>