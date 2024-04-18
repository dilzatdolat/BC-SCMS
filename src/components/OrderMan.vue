<template>
  <div class="container">
    <h1 class="title">供应商订单管理</h1>

    <el-card class="box-card">
      <template #header>
        <span class="header-text">处理订单</span>
      </template>
      <el-input v-model="orderId" placeholder="溯源 ID" class="input-field"></el-input>
      <div class="button-group">
        <el-button type="primary" @click="processOrder(true)" class="button">接受订单</el-button>
        <el-button type="danger" @click="processOrder(false)" class="button">拒绝订单</el-button>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <span class="header-text">查看订单</span>
      </template>
      <el-input v-model="orderIdToView" placeholder="溯源 ID" class="input-field"></el-input>
      <el-button type="primary" @click="getOrder" class="button">获取订单详情</el-button>
      <div v-if="orderDetails" class="order-details">
        原材料 ID: {{ orderDetails.materialId }}, 数量: {{ orderDetails.quantity }}, 状态: {{ orderDetails.status }}
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <span class="header-text">所有订单</span>
      </template>
      <el-button type="primary" @click="getAllOrders" class="button">加载所有订单</el-button>
      <el-table :data="allOrders" style="width: 100%">
        <el-table-column prop="materialId" label="原材料 ID"></el-table-column>
        <el-table-column prop="quantity" label="数量"></el-table-column>
        <el-table-column prop="requester" label="请求者">
          <template v-slot="scope">
            {{ formatRequester(scope.row.requester) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="traceabilityId" label="溯源ID"></el-table-column>
      </el-table>
      <div v-if="allOrders.length === 0" class="no-orders">没有订单。</div>
    </el-card>
  </div>
</template>

<script>
import Web3 from 'web3';
import { ordersManagementAddress, ordersManagementABI } from '../contracts/config';

export default {
  data() {
    return {
      web3: null,
      ordersManagementContract: null,
      orderId: '',
      orderIdToView: '',
      orderDetails: null,
      allOrders: [],
    };
  },
  mounted() {
    this.initWeb3();
  },
  methods: {
    async initWeb3() {
      if (window.ethereum) {
        this.web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          this.ordersManagementContract = new this.web3.eth.Contract(ordersManagementABI, ordersManagementAddress);
        } catch (error) {
          console.error("用户未授权.");
        }
      } else {
        console.error("请安装MetaMask.");
      }
    },
    async processOrder(accept) {
      if (!this.orderId) {
        alert('请填写溯源ID');
        return;
      }

      // 检查输入是否为数字
      if (isNaN(this.orderId)) {
        alert('请输入数字');
        return;
      }

      const accounts = await this.web3.eth.getAccounts();
      await this.ordersManagementContract.methods.processOrder(this.orderId, accept).send({ from: accounts[0] });
      this.orderId = '';
    },
    async getOrder() {
      if (!this.orderIdToView) {
        alert('请正确填写溯源ID');
        return;
      }

      // 检查输入是否为数字
      if (isNaN(this.orderIdToView)) {
        alert('请输入数字');
        return;
      }

      const order = await this.ordersManagementContract.methods.getOrder(this.orderIdToView).call();
      this.orderDetails = {
        materialId: order[0],
        quantity: order[1],
        requester: order[2],
        status: ['待定', '确认', '拒绝'][order[3]],
        traceabilityId: order[4]
      };
    },
    async getAllOrders() {
      try {
        const result = await this.ordersManagementContract.methods.getAllOrders().call();
        const materialIds = result[0];
        const quantities = result[1];
        const requesters = result[2];
        const statuses = result[3].map(status => ['待定', '确认', '拒绝'][status]);
        const traceabilityIds = result[4];

        this.allOrders = materialIds.map((materialId, index) => ({
          materialId,
          quantity: quantities[index],
          requester: requesters[index],
          status: statuses[index],
          traceabilityId: traceabilityIds[index],
        }));
      } catch (error) {
        console.error("获取所有订单时发生错误: ", error);
      }
    },
    formatRequester(requester) {
      if (requester === '0x08295B58cF527ACf4eD889A7415F2817692E5B77') {
        return '制造商A';
      }
      return requester;
    },
  },
};
</script>

<style scoped>
.inventory-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content-wrapper {
  max-width: 800px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.fetch-btn {
  display: block;
  margin: 0 auto 20px;
  background-color: #409eff;
  color: #fff;
}

.subtitle {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.update-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.order-id-input {
  width: 300px;
  margin-right: 10px;
}

.update-btn {
  background-color: #ff9900;
  color: #fff;
}

.total-inventory-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.total-inventory-label {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-right: 10px;
}

.total-inventory-value {
  font-size: 24px;
  font-weight: bold;
  color: #409eff;
}
</style>


  
  ../contracts/config