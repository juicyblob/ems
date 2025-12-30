import { defineStore } from "pinia";
import type { Employee } from "../interfaces/employee.interface";
import { ref, watch } from "vue";
import axios from "axios";
import { API_ROUTES } from "../api";
import {v4 as uuidv4} from "uuid";
import employeesData from '../data/employees.json';
import { USER_ID_KEY } from '../utils/constants';

export const useEmployeeStore = defineStore('employee', () => {
    const employees = ref<Employee[]>([]);
    const categoryEmployees = ref<Employee[]>([]);
    const currentSort = ref<string>('date');

    watch(currentSort, async (newCurrentSort) => {
        await setEmloyeesSort(newCurrentSort);
    });

    async function fetchEmployees(alias: string) {
        const { data } = await axios.get<Employee[]>(API_ROUTES.employees, {
            params: {
                category: alias,
                sort: currentSort.value
            }
        });
        employees.value = data;
    }

    async function getEmpoyeesByAlias(alias: string) {
        if (employees.value) {
            if (alias == 'all') {
                categoryEmployees.value = employees.value;
            } else {
                categoryEmployees.value = employees.value?.filter((employee) => employee.department === alias);
            }
        }
    }

    async function setEmloyeesSort(sort: string) {
        switch (sort) {
            case 'age':
                categoryEmployees.value.sort((a, b) => (b.age ?? 0) - (a.age ?? 0));
                break;
            case 'salary':
                categoryEmployees.value.sort((a, b) => (b.salary ?? 0) - (a.salary ?? 0));
                break;
            case 'date':
                categoryEmployees.value.sort((a, b) => {
                    const createdA = a.created_at ?? 0;
                    const createdB = b.created_at ?? 0;
                    const dateA = new Date(String(createdA).split('.').reverse().join('-')).getTime();
                    const dateB = new Date(String(createdB).split('.').reverse().join('-')).getTime();
                    return dateB - dateA;
                });
                break;
        }
    }

    async function uploadDemoEmployees() {
        const userId = uuidv4();
        localStorage.setItem(USER_ID_KEY, userId);
        
        for (const employee of employeesData) {
            await axios.post<Employee>(API_ROUTES.employees, employee);
        }
        
    }

    return { employees, fetchEmployees, uploadDemoEmployees, getEmpoyeesByAlias, categoryEmployees, currentSort }
});