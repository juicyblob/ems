import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Employee } from "../interfaces/employee.interface";
import axios from "axios";
import { API_ROUTES } from "../api";


export const useArchiveStore = defineStore('archive', () => {

    const employees = ref<Employee[]>([]);
    const currentSort = ref<string>('date');
    const selectEmployeeId = ref<number>(0);
    const selectEmployeeDepartment = ref<string>('');

    watch(currentSort, async (newSort) => {
        await setEmployeesSort(newSort);
    });

    async function fetchEmployees() {
        const { data } = await axios.get<Employee[]>(API_ROUTES.archive, {
            params: {
                sort: currentSort.value
            }
        });
        employees.value = data;
    }

    async function setEmployeesSort(sort: string) {
        switch (sort) {
            case 'age':
                employees.value.sort((a, b) => (b.age ?? 0) - (a.age ?? 0));
                break;
            case 'salary':
                employees.value.sort((a, b) => (b.salary ?? 0) - (a.salary ?? 0));
                break;
            case 'date':
                employees.value.sort((a, b) => {
                    const createdA = a.created_at ?? 0;
                    const createdB = b.created_at ?? 0;
                    const dateA = new Date(String(createdA).split('.').reverse().join('-')).getTime();
                    const dateB = new Date(String(createdB).split('.').reverse().join('-')).getTime();
                    return dateB - dateA;
                });
                break;
        }        
    }

    async function restoreEmployee(id: number) {
        await axios.post(`${API_ROUTES.archive}/${id}/restore`);
    }

    async function removeEmployee(id: number) {
        await axios.delete(`${API_ROUTES.archive}/${id}`);
    }

    async function clearArchive() {
        await axios.delete(API_ROUTES.archive);
    }

    return { employees, currentSort, selectEmployeeId, selectEmployeeDepartment, fetchEmployees, restoreEmployee, removeEmployee, clearArchive }

});