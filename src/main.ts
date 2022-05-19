import 'normalize.css'; // 保持各浏览器样式统一
import '@css/reset.css'; // 重置样式
import '@css/common.css'; // 引入公共样式
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App).use(store).use(router).mount('#app');
