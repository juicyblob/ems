<script setup lang="ts">
  import IconLogo from '../assets/svg/IconLogo.vue';
  import CategoryList from '../components/CategoryList.vue';
  import Search from '../components/Search.vue';
  import Version from '../components/Version.vue';

</script>

<template>
    <div class="dashboard">
        <div class="dashboard__navigation">
            <div class="dashboard__navigation-wrapper">
                <IconLogo />
                <CategoryList />
                <Version />
            </div>
        </div>
        <div class="dashboard__content">
            <Search />
            <div class="dashboard__content-body">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .dashboard {
        height: 100vh;

        &__navigation {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 20%;
            max-width: 380px;
            padding: 72px 0 72px 3.6%;
            background-color: var(--color-blue);

            &-wrapper {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                height: 100%;
            }
        }
        &__content {
            width: 80%;
            margin-left: 20%;
            height: 100%;

            &-body {
                 padding: 137px 60px 80px 60px;
            }
        }
    }
</style>