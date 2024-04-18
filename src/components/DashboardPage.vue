<template>
  <div :class="themeClass">
    <h1 class="animated-title">欢迎来到供应链管理系统</h1>
    <p v-if="isAdmin" class="animated-text">您具有管理员权限</p>
    <p v-else class="animated-text">您具有普通用户权限</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 假设这是从 Vuex store 或其他全局状态管理工具获取的
      userRole: 'admin', // 可以是 'admin' 或 'user'
    };
  },
  computed: {
    isAdmin() {
      return this.userRole === 'admin';
    },
    themeClass() {
      return this.isAdmin ? 'admin-theme' : 'user-theme';
    },
  },
};
</script>

<style scoped>
.admin-theme {
  background-color: #2c3e50; /* 深蓝色 */
  color: #ffffff;
}

.admin-theme h1 {
  color: #ffd700; /* 金色 */
}

.user-theme {
  background-color: #f0f0f0; /* 浅灰色 */
  color: #333333;
}

.user-theme h1 {
  color: #009688; /* 青色 */
}

/* 动画效果 */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

.animated-title {
  animation: bounce 2s infinite;
}

.animated-text {
  animation: bounce 2s infinite;
  animation-delay: 0.5s; /* 文本动画延迟，使得标题和文本动画不同步 */
}

/* 通用样式 */
div {
  padding: 20px;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 20px;
}

p {
  margin-bottom: 10px;
  font-size: 16px;
}
</style>

