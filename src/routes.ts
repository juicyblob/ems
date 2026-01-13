import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
    routes: [
        {
            path: '/',
            component: () => import('./views/LoadingView.vue'),
            name: 'loading'
        },
        {
            path: '/employees',
            redirect: '/employees/all'
        },
        {
           path: '/employees/:alias',
           component: () => import('./views/MainView.vue'),
           name: 'employees',
           children: [
            {
                path: '',
                name: 'employee-list',
                component: () => import('./components/Category.vue')
            },
            {
                path: 'new',
                name: 'employee-new',
                component: () => import('./components/EmployeeForm.vue'),
                props: {
                    mode: 'new'
                }
            },
            {
                path: 'edit',
                name: 'employee-edit',
                component: () => import('./components/EmployeeForm.vue'),
                props: {
                    mode: 'edit'
                }
            }
           ]
        }
    ],
    history: createWebHistory(),
});