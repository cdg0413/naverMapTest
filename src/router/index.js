import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/home',
        component: () => import('../views/Home.vue'),
        meta: {
            title: 'home',
        },
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: {
            title: 'home',
        },
    },
    {
        path: '/add',
        name: 'add',
        component: () => import('../views/Add.vue'),
        meta: {
            title: 'add',
        },
    },
    // // 메인
    // {
    //     path: '/main',
    //     name: 'main',
    //     component: () => import('../views/main/main.vue'),
    //     meta: {
    //         title: "main",
    //         layout: Layout,
    //     },
    // },

];

const router = createRouter({
    // mode: 'history',
    history: createWebHistory(),
    linkActiveClass: 'active',
    //linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    /*
     * to: 이동할 url 정보가 담긴 라우터 객체
     * from: 현재 url 정보가 담긴 라우터 객체
     * next: to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
     * next() 가 호출되기 전까지 화면 전환되지 않음
     */

    // 1. 문서 제목 설정
    if (to.meta.title) {
        document.title = '제목 ' + to.meta.title;
    } else {
        document.title = '제목';
    }

    next();
});

export default router;
