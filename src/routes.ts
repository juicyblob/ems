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
           path: '/employees/:alias(all|heads|designers|programmers|managers)',
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
        },
        {
          path: '/employees/archive',
          component: () => import('./views/MainView.vue'),
          children: [
            {
                path: '',
                component: () => import('./components/Archive.vue'),
                name: 'archive' 
            }
          ]  
        },
        {
            path: '/employees/search/:query?',
            component: () => import('./views/MainView.vue'),
            children: [
                {
                    path: '',
                    component: () => import('./components/SearchPage.vue'),
                    name: 'employee-search',
                    props: true
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('./views/MainView.vue'),
            children: [
                {
                    path: '',
                    component: () => import('./components/NotFound.vue'),
                    name: 'notFound'
                }
            ]
        }
    ],
    history: createWebHistory(import.meta.env.BASE_URL),

    scrollBehavior() {
        return { top: 0, left: 0}
    }
});