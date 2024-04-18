<template>
  <div>
    <el-container>
      <el-header>
        <h1 class="header-title">库存管理</h1>
      </el-header>
      <el-main>
        <el-card class="inventory-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">当前库存</span>
            </div>
          </template>
          <el-table :data="inventory" style="width: 100%" class="inventory-table">
            <el-table-column prop="materialId" label="物料 ID" />
            <el-table-column prop="quantity" label="数量" />
          </el-table>
        </el-card>
        <el-card class="order-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">接收订单</span>
            </div>
          </template>
          <div class="order-input-container">
            <el-input v-model="orderId" placeholder="输入订单 ID" class="order-input" />
            <el-button type="primary" @click="receiveOrder" class="order-button">接收订单</el-button>
          </div>
          <div v-if="error" class="error-message">{{ error }}</div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Web3 from 'web3';

import { inventoryContractAddress, inventoryContractABI } from '../contracts/config';

export default {
  data() {
    return {
      web3: null,
      accounts: [],
      inventoryContract: null,
      inventory: [],
      orderId: '',
      error: ''
    };
  },
  async mounted() {
    try {
      // 连接到以太坊节点
      this.web3 = new Web3('http://localhost:7545');

      // 获取用户账户
      this.accounts = await this.web3.eth.getAccounts();

      // 创建合约实例
      this.inventoryContract = new this.web3.eth.Contract(
        inventoryContractABI,
        inventoryContractAddress
      );

      // 获取初始库存
      this.fetchInventory();
    } catch (error) {
      console.error('初始化时出错:', error);
    }
  },
  methods: {
    async fetchInventory() {
      try {
        const inventoryItems = await this.inventoryContract.methods
          .viewInventory()
          .call({ from: this.accounts[0] });
        this.inventory = inventoryItems;
      } catch (error) {
        console.error('获取库存时出错:', error);
      }
    },
    async receiveOrder() {
      try {
        // 检查订单 ID 是否为空
        if (!this.orderId) {
          this.error = '订单 ID 不能为空';
          return;
        }

        // 检查订单 ID 是否为数字
        if (isNaN(this.orderId)) {
          this.error = '订单 ID 必须为数字';
          return;
        }

        await this.inventoryContract.methods
          .receiveOrder(this.orderId)
          .send({ from: this.accounts[0] });
        console.log(`已接收订单 ${this.orderId}`);
        this.orderId = '';
        this.fetchInventory();
        this.error = ''; // 清空错误信息
      } catch (error) {
        console.error('接收订单时出错:', error);
        this.error = '接收订单时出错,请重试'; // 设置错误信息
      }
    },
  },
};
</script>

<style scoped>
.header-title {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.inventory-card,
.order-card {
  margin-bottom: 20px;
}

.card-header {
  font-weight: bold;
}

.order-input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.order-input {
  width: 200px;
  margin-right: 10px;
}

.error-message {
  color: #f56c6c;
  font-size: 14px;
  margin-top: 8px;
}
</style>
