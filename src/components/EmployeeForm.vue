<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    import ButtonDefault from './ButtonDefault.vue';
    import { nextTick, onMounted, ref } from 'vue';
    import type { Employee } from '../interfaces/employee.interface';
    import type { FormErrors } from '../interfaces/errors.interface';
    import { useEmployeeStore } from '../stores/employee.store';
    import { useNotificationStore } from '../stores/notification.store';
    import { notifications } from '../utils/constants';
    import SubmitLoader from './SubmitLoader.vue';

    const { mode } = defineProps<{ mode: 'new' | 'edit'}>();
    const title = mode == 'new' ? 'Заполните данные нового сотрудника' : 'Редактирование данных сотрудника';

    const router = useRouter();
    const route = useRoute();
    const storeEmployee = useEmployeeStore();
    const storeNotification = useNotificationStore();
    const department = ref(route.params.alias);
    const loader = ref<boolean>(false);
    const employeeData = ref<Employee>({
        name: '',
        birthday: '',
        position: '',
        salary: 0,
        photo: '',
        email: '',
        department: String(department.value),
    });

    function initEmployeeData() {
        if (mode == 'edit' && storeEmployee.selectEmployee) {
            employeeData.value = {
                name: storeEmployee.selectEmployee.name,
                birthday: storeEmployee.selectEmployee.birthday,
                position: storeEmployee.selectEmployee.position,
                salary: storeEmployee.selectEmployee.salary,
                photo: storeEmployee.selectEmployee.photo,
                email: storeEmployee.selectEmployee.email,
                department: storeEmployee.selectEmployee.department
            }
        }
    }

    onMounted(() => {
        initEmployeeData();
    });

    const errors = ref<FormErrors>({});

    function validateForm() {
        errors.value = {};
        
        // Имя и фамилия
        const nameRegExp = /^[А-Яа-яЁё]+\s[А-Яа-яЁё]+$/;
        if (!nameRegExp.test(employeeData.value.name)) {
            errors.value.name = 'Имя и фамилия заполнены некорректно';
        }
        // Дата рождения
        const birthRegExp = /^\d{2}\.\d{2}\.\d{4}$/;
        if (!birthRegExp.test(employeeData.value.birthday)) {
            errors.value.birthday = 'Неверный формат даты';
        }
        // Должность
        if (employeeData.value.position == '') {
            errors.value.position = 'Не указана должность';
        }
        // Ставка
        if (employeeData.value.salary <= 0) {
            errors.value.salary = 'Не корректная ставка';
        }
        // Ссылка на фото
        if (employeeData.value.photo == '') {
            errors.value.photo = 'Не указана ссылка на фото';
        }
        // Email
        const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegExp.test(employeeData.value.email)) {
            errors.value.email = 'Неккоректный email';
        }

        return Object.keys(errors.value).length === 0;
    }

    async function saveEmployee() {
        if (!validateForm()) {
            for (let error of Object.values(errors.value)) {
                console.log(error);
            }
            return;
        }

        loader.value = true;

        try {
            if (mode == 'new') {
                await storeEmployee.createEmployee(employeeData.value);
            } else {
                await updateEmployee();
            }
            
            const alias = route.params.alias;

            await storeEmployee.fetchEmployees('all');
            await storeEmployee.getEmpoyeesByAlias(String(alias));

            nextTick(() => {
                if (mode == 'new') {
                    storeNotification.showNotification(notifications.added);
                } else {
                    storeNotification.showNotification(notifications.edited);
                }
                setTimeout(() => {
                    loader.value = false;
                    router.push({ name: 'employee-list', params: { alias: alias}});
                }, 600);
            });
            
        } catch {
            loader.value = false;
            if (mode == 'new') {
                storeNotification.showNotification(notifications.error.added);
            } else {
                storeNotification.showNotification(notifications.error.edited);
            }
            
        }
        
    }

    async function updateEmployee() {
        const current = storeEmployee.selectEmployee;
        const newEmployeeData = Object.fromEntries(
            Object.entries(employeeData.value).filter(([key, value]) => {
                return value !== current[key as keyof typeof current];
            })
        );
        if (Object.keys(newEmployeeData).length == 0) return;
        await storeEmployee.updateEmployee(current.id ?? 0, newEmployeeData);
    }

    function goBack() {
        router.go(-1);
    }

</script>

<template>
    <h1 class="employee__form-title">{{ title }}</h1>
    <div class="employee">
        <form class="employee__form" @submit.prevent="saveEmployee">
        <div class="employee__form-row">
            <div class="employee__form-group">
                <label for="employee_name" 
                class="employee__form-label" 
                :class="errors.name ? 'error': ''">
                Имя и фамилия
                <div class="employee__form-error">!</div>
                </label>
                <input 
                type="text" 
                class="employee__form-input" 
                id="employee_name"
                v-model="employeeData.name"
                >
            </div>
        </div>
        <div class="employee__form-row">
            <div class="employee__form-group">
                <label for="employee_birthday" 
                class="employee__form-label" 
                :class="errors.birthday ? 'error': ''">
                Дата рождения (дд.мм.гггг)
                <div class="employee__form-error">!</div>
                </label>
                <input 
                type="text" 
                class="employee__form-input" 
                id="employee_birthday"
                v-model="employeeData.birthday"
                >
            </div>
        </div>
        <div class="employee__form-row">
            <div class="employee__form-group">
                <label for="employee_position" 
                class="employee__form-label" 
                :class="errors.position ? 'error': ''">
                Должность
                <div class="employee__form-error">!</div>
                </label>
                <input 
                type="text" 
                class="employee__form-input" 
                id="employee_position"
                v-model="employeeData.position"
                >
            </div>
            <div class="employee__form-group">
                <label for="employee_salary" 
                class="employee__form-label" 
                :class="errors.salary ? 'error': ''">
                Ставка/мес
                <div class="employee__form-error">!</div>
                </label>
                <input 
                type="number" 
                class="employee__form-input" 
                id="employee_salary"
                v-model="employeeData.salary"
                >
            </div>
        </div>
        <div class="employee__form-row">
            <div class="employee__form-group">
                <label for="employee_photo" 
                class="employee__form-label" 
                :class="errors.photo ? 'error': ''">
                Ссылка на фото
                <div class="employee__form-error">!</div>
                </label>
                <input 
                type="url" 
                class="employee__form-input" 
                id="employee_photo"
                v-model="employeeData.photo"
                >
            </div>
            <div class="employee__form-group">
                <label for="employee_mail" 
                class="employee__form-label" 
                :class="errors.email ? 'error': ''">
                Email
                <div class="employee__form-error">!</div>
                </label>
                <input 
                type="email" 
                class="employee__form-input" 
                id="employee_mail"
                v-model="employeeData.email"
                >
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
            <ButtonDefault type="submit" text="Сохранить" color="yellow" txt-color="dark" />
            <ButtonDefault type="button" text="Отмена" color="red" txt-color="white" @click="goBack" />
        </div>
        </form>       
    </div>
    <SubmitLoader :show="loader"/>
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
                display: flex;
                align-items: center;
                gap: 8px;
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

            &-error {
                visibility: hidden;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--color-red);
                font-weight: 800;
                font-size: 12px;
                line-height: 12px;
                color: var(--color-white);
            }

            &-label.error &-error {
                visibility: visible;
            }

        }
    }
</style>