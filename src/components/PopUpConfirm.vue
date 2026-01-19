<script setup lang="ts">
import ButtonDefault from './ButtonDefault.vue';

const { open = false, title, hasName, name, text} = defineProps<{
    open: boolean,
    title: string,
    hasName: boolean,
    name?: string,
    text: string
}>();

const emit = defineEmits<{
    (e: 'ok'): void,
    (e: 'cancel'): void
}>();

</script>

<template>
    <Transition name="fade">
        <Teleport to="body">
            <div v-show="open" class="pop-up">
             <div class="pop-up__body">
                    <div class="pop-up__body-title">{{ title }}</div>
                    <div v-if="hasName" class="pop-up__body-employee-name">{{ name }}</div>
                    <div class="pop-up__body-text">{{ text }}</div>
                    <div class="pop-up__body-buttons">
                        <ButtonDefault text="Подтверждаю" color="blue" txt-color="white" @click="emit('ok')" />
                        <ButtonDefault text="Отменить" color="red" txt-color="white" @click="emit('cancel')" />
                    </div>
                </div>
            </div>
        </Teleport>
    </Transition>
</template>

<style scoped lang="scss">
    .pop-up {
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

        &__body {
            border-radius: 16px;
            background-color: var(--color-white);
            padding: 46px 117px 46px 46px;
            color: var(--color-dark);

            &-title, &-employee-name {
                font-weight: 500;
                font-size: 24px;
                line-height: 34px;
            }

            &-text {
                margin-top: 24px;
                margin-bottom: 60px;
                font-size: 20px;
                font-weight: 28px;
            }

            &-buttons {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 16px;
            }
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s ease-out;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>