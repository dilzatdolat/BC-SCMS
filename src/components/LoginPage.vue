<template>
  <div class="login-container">
    <div class="background-image"></div>
    <el-card class="login-card">
      <div class="login-header">
        <h2>即将进入供应链管理系统</h2>
      </div>
      <el-form ref="loginForm" :model="loginForm" label-width="0">
        <el-form-item>
          <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="loginForm.password" placeholder="密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="login-button">登录</el-button>
        </el-form-item>
        <el-form-item v-if="message || errorMessage" :class="messageClass">
          <p>{{ message || errorMessage }}</p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      message: '',
      errorMessage: ''
    };
  },
  computed: {
    messageClass() {
      return {
        'success-message': this.message,
        'error-message': this.errorMessage
      };
    }
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.loginForm)
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();

        if (data.message === 'Login success') {
          // 更新 Vuex store 的登录状态和用户角色
          this.$store.dispatch('login', { user: this.loginForm.username });

          // 在登录成功后跳转到主页
          this.$router.push('/dashboard');

          this.message = '登录成功！';
          this.errorMessage = '';
        } else {
          this.message = this.errorMessage = '登录失败，请检查用户名和密码！';
        }
      } catch (error) {
        console.error('Error:', error);
        this.message = this.errorMessage = '登录失败，请检查网络连接！';
      }
    }
  }
};
</script>




<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(@/assets/golo.png);
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.login-card {
  width: 400px;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-button {
  width: 100%;
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}
</style>
