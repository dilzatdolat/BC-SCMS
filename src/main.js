import { createApp } from 'vue';
import App from './App.vue';
import { ElMessage } from 'element-plus';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; // 更新样式文件引入路径
import router from './router';
import store from './store/';

const app = createApp(App);

// 注册全局的 ElMessage 组件
app.config.globalProperties.$message = ElMessage;

// 使用 ElementPlus
app.use(ElementPlus);

// 使用 Vuex store
app.use(store);

// 使用路由
app.use(router);

// 挂载 Vue 应用
app.mount('#app');

