<template>
  <div class="common-layout">
    <el-container>
      <!-- Sidebar area, only shown when user is logged in -->
      <el-aside v-if="isLoggedIn" width="200px" class="sidebar">
        <el-menu background-color="#2c3e50" text-color="#b4bcc8" active-text-color="#ffd04b" class="centered-menu">
          <!-- Menu items -->
          <el-menu-item v-if="isAdmin" @click="navigate('raw')" class="menu-item">
            <i class="el-icon-menu"></i>
            原材料管理
          </el-menu-item>
          <el-menu-item v-if="isAdmin" @click="navigate('orderman')" class="menu-item">
            <i class="el-icon-edit"></i>
            订单管理
          </el-menu-item>
          <el-menu-item v-if="!isAdmin" @click="navigate('order1')" class="menu-item">
            <i class="el-icon-send"></i>
            下单管理
          </el-menu-item>
          <el-menu-item v-if="!isAdmin" @click="navigate('order2')" class="menu-item">
            <i class="el-icon-send"></i>
            订单状态查询
          </el-menu-item>
          <el-menu-item v-if="!isAdmin" @click="navigate('order3')" class="menu-item">
            <i class="el-icon-send"></i>
            库存信息查询
          </el-menu-item>
        </el-menu>
        <!-- Sidebar buttons -->
        <div class="aside-buttons">
          <el-button type="primary" @click="logout" block>登出</el-button>
        </div>
      </el-aside>
      <!-- Main content area -->
      <el-main class="main-content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    }
  },
  created() {
    this.$store.dispatch('checkLoginStatus');
  },
  methods: {
    navigate(route) {
      this.$router.push(`/${route}`);
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  }
};
</script>



<style scoped>
.common-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  background-color: #2c3e50;
  transition: width 0.5s;
}

.centered-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 200px;
}

.menu-item {
  transition: background-color 0.3s;
  text-align: center;
  width: 100%;
}

.menu-item:hover {
  background-color: #34495e;
}

.aside-buttons {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
}

.aside-buttons button {
  transition: transform 0.3s;
}

.aside-buttons button:hover {
  transform: scale(1.1);
}
</style>











