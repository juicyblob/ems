<script setup lang="ts">
import IconMail from '../assets/svg/IconMail.vue';

const { photo, name, position, mail } = defineProps<{
    photo: string,
    name: string,
    position: string;
    mail: string;
}>();

const onlineStatus = Math.floor(Math.random() * 10) + 1 <= 7 ? 'online' : 'offline';

</script>

<template>
    <div class="category__card">
        <div class="category__card-photo">
            <div class="category__card-image">
                <img :src="photo" alt="Ошибка загрузки">
            </div>
            <div class="category__card-status" :class="onlineStatus"></div>
        </div>
        <div class="category__card-info">
            <div class="category__card-name">{{ name }}</div>
            <div class="category__card-position">{{ position }}</div>
        </div>
        <a :href="`mailto:${mail}`" target="_blank" class="category__card-mail">
            <IconMail />
        </a>
    </div>
</template>

<style scoped lang="scss">
    .category__card {
        position: relative;
        background-color: var(--color-white);
        border: 1px solid var(--color-light-gray);
        border-radius: 8px;
        padding: 46px 0;

        &-photo {
           position: relative;
           width: 100px;
           height: 100px;
           margin: 0 auto; 
        }

        &-image {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: var(--color-silver);
            overflow: hidden;

            img {
                width: 100%;
                height: auto;
                object-fit: cover;
            }
        }

        &-status {
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            right: 10px;
            bottom: 9px;

            &.online {
                background-color: var(--color-green);
            }

            &.offline {
                background-color: var(--color-red);
            }
        }

        &-info {
            font-size: 14px;
            text-align: center;
            margin-top: 12px;
        }

        &-name {
            font-weight: 500;
            color: var(--color-dark);
            margin-bottom: 7px;
        }

        &-position {
            color: var(--color-gray);
        }

        &-mail {
            position: absolute;
            text-decoration: none;
            top: 18px;
            right: 18px;
        }
    }
</style>