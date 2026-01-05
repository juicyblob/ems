<script setup lang="ts">
import { computed } from 'vue';
import type { Employee } from '../interfaces/employee.interface';
import Button from './ButtonDefault.vue';

const { employee } = defineProps<{ employee: Employee}>();

const emit = defineEmits<{
    (e: 'backward'): void
}>();

function calcEmployeeExpirience(hireDate: string) {
    const parts: string[] = hireDate.split('.');
    const hiringDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
    const todayDate = new Date();

    let years = todayDate.getFullYear() - hiringDate.getFullYear();
    const months = todayDate.getMonth() - hiringDate.getMonth();

    if (months < 0 || (months === 0 && todayDate.getDate() < hiringDate.getDate())) {
        years--;
    }

    if (years < 1) {
        return "менее года";
    }

    return `${years} ${getYearWord(years)}`;

    function getYearWord(countYears: number) {
        switch (countYears) {
            case 1:
                return 'год';
            case 2:
            case 3:
            case 4:
                return 'года';
            default:
                return 'лет';
        }
    }
}

const employeeData = computed(() => {
    return [
        {
            id: 1,
            label: 'Возраст:',
            value: `${employee.age} лет`
        },
        {
            id: 2,
            label: 'Дата приема:',
            value: employee.created_at
        },
        {
            id: 3,
            label: 'Ставка/мес:',
            value: `${employee.salary.toLocaleString('ru-RU')} р.`
        },
        {
            id: 4,
            label: 'Стаж в компании:',
            value: calcEmployeeExpirience(employee.created_at ?? String(new Date()))
        },
        {
            id: 5,
            label: 'Email:',
            value: employee.email

        }
    ]
});

</script>

<template>
    <div class="employee">
        <div class="employee__detail">
            <div class="employee__head">
                <div class="employee__head-left">
                    <div class="employee__photo">
                        <img :src="employee.photo" alt="Ошибка загрузки">
                    </div>
                    <div class="employee__info">
                    <div class="employee__info-title">{{ employee.name }}</div>
                    <div class="employee__info-position">{{ employee.position }}</div>
                    </div>
                </div>
                <div class="employee__head-right">
                    <Button text="Вернуться назад" color="blue" txt-color="white" @click="emit('backward')"/>
                </div>
            </div>
            <div class="employee__data">
                <div class="employee__data-item"
                v-for="employee in employeeData"
                :key="employee.id"
                >
                    <div class="employee__data-label">{{ employee.label }}</div>
                    <div class="employee__data-value">{{ employee.value }}</div>
                </div>
            </div>
            <div class="employee__buttons">
                <Button text="Редактировать" color="yellow" txt-color="dark" />
                <Button text="Удалить" color="red" txt-color="white" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .employee {
        border-radius: 16px;
        padding: 46px;
        background-color: var(--color-white);
        color: var(--color-dark);
        

        &__head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            &-left {
                display: flex;
                align-items: center;
                gap: 24px;
            }

            &-right {}
        }

        &__photo {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            overflow: hidden;
            background-color: var(--color-silver);

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &__info {

            &-title {
                font-size: 32px;
                font-weight: 500;
                margin-bottom: 10px;
            }
            &-position {
                font-size: 24px;
                color: var(--color-gray);
            }
        }

        &__data {
            margin: 49px 0 32px;
            max-width: 510px;

            &-item {
                display: flex;
                align-items: center;
                gap: 7px;
                padding: 10px 0;
                margin-bottom: 14px;
                border-bottom: 1px dashed #9e9eae;

                &:last-child {
                    margin-bottom: 0;
                }
            }
            &-value {
                font-size: 20px;
            }

            &-label {
                font-weight: 500;
                font-size: 20px;
            }
        }

        &__buttons {
            display: flex;
            justify-content: flex-end;
            gap: 24px;
        }
    }
</style>