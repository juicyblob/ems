<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    import ButtonDefault from './ButtonDefault.vue';
    import { ref } from 'vue';

    const router = useRouter();
    const route = useRoute();
    const department = ref(route.params.alias);


    function saveEmployee() {}

    function goBack() {
        router.go(-1);
    }

</script>

<template>
    <h1 class="employee__form-title">Заполните данные нового сотрудника</h1>
    <div class="employee">
        <form class="employee__form" @submit.prevent="saveEmployee">
        <div class="employee__form-row">
            <div class="employee__form-group">
                <label for="employee_name" class="employee__form-label">Имя и фамилия</label>
                <input type="text" class="employee__form-input" id="employee_name">
            </div>
        </div>
        <div class="employee__form-row">
            <div class="employee__form-group">
                <label for="employee_birthday" class="employee__form-label">Дата рождения</label>
                <input type="text" class="employee__form-input" id="employee_birthday">
            </div>
        </div>
        <div class="employee__form-row">
            <div class="employee__form-group">
                <label for="employee_position" class="employee__form-label">Должность</label>
                <input type="text" class="employee__form-input" id="employee_position">
            </div>
            <div class="employee__form-group">
                <label for="employee_salary" class="employee__form-label">Ставка/мес</label>
                <input type="text" class="employee__form-input" id="employee_salary">
            </div>
        </div>
        <div class="employee__form-row">
            <div class="employee__form-group">
                <label for="employee_photo" class="employee__form-label">Ссылка на фото</label>
                <input type="text" class="employee__form-input" id="employee_photo">
            </div>
            <div class="employee__form-group">
                <label for="employee_mail" class="employee__form-label">Email</label>
                <input type="text" class="employee__form-input" id="employee_mail">
            </div>
        </div>
        <div class="employee__form-row">
            <div class="employee__form-group">
                <label for="employee_department" class="employee__form-label">Отдел</label>
                <select v-model="department" id="employee_department" class="employee__form-select">
                    <option value="all">Не указан</option>
                    <option value="heads">Руководители</option>
                    <option value="designers">Дизайнеры</option>
                    <option value="programmers">Программисты</option>
                    <option value="managers">Менеджеры</option>
                </select>
            </div>
        </div>
        <div class="employee__form-buttons">
            <ButtonDefault text="Сохранить" color="yellow" txt-color="dark" />
            <ButtonDefault text="Отмена" color="red" txt-color="white" @click="goBack" />
        </div>
        </form>       
    </div>

</template>

<style scoped lang="scss">
    .employee {
        border-radius: 16px;
        padding: 46px;
        background-color: var(--color-white);
        color: var(--color-dark);
        margin-top: 40px;
        max-width: 900px;

        &__form {
           
            &-row {
                display: flex;
                align-items: flex-start;
                gap: 40px;
                width: 100%;
                margin-bottom: 24px;
            }

            &-group {
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                width: 100%;
            }

            &-label {
                font-size: 14px;
                line-height: 14px;
                color: var(--color-label);
                font-family: var(--font-family);
                margin-bottom: 12px;
            }

            &-input, &-select {
                border: none;
                outline: none;
                appearance: none;
                border-bottom: 1px solid var(--color-dark);
                width: 100%;
                height: 32px;
                font-size: 20px;
                color: var(--color-dark);
            }

            &-select {
                max-width: 383px;
                appearance: menulist;
            }
            
            &-buttons {
                margin-top: 58px;
                display: flex;
                align-items: center;
                gap: 24px;
                justify-content: flex-end;
            }

        }
    }
</style>