import { createRouter, createWebHashHistory } from "vue-router";
import Raw from "./components/RawMatir.vue";
import OrderMan from "./components/OrderMan.vue";
import Login from "./components/LoginPage.vue";
import Order1 from "./components/OrderPage2.vue";
import Order2 from "./components/OrderPage3.vue";
import Order3 from "./components/OrderPage4.vue";
import dashboard from "./components/DashboardPage.vue";
import store from './store';

const routes = [
  {
    path: '/',
    redirect: '/login' // 默认重定向到登录页面
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false } // 登录页面不需要认证
  },
  {
    path: '/raw',
    name: 'Raw',
    component: Raw,
    meta: { requiresAuth: true } // 添加元数据标记，需要认证
  },
  {
    path: '/order1',
    name: 'Order1',
    component: Order1,
    meta: { requiresAuth: true } // 添加元数据标记，需要认证
  },
  {
    path: '/order2',
    name: 'Order2',
    component: Order2,
    meta: { requiresAuth: true } // 添加元数据标记，需要认证
  },
  {
    path: '/order3',
    name: 'Order3',
    component: Order3,
    meta: { requiresAuth: true } // 添加元数据标记，需要认证
  },
  {
    path: '/orderman',
    name: 'OrderMan',
    component: OrderMan,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    meta: { requiresAuth: true }
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 添加全局前置守卫
// 在router.js中
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.isLoggedIn) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});




export default router;

