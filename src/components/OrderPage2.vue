<template>
    <div>
      <h1>原材料信息</h1>
      <el-button type="primary" @click="fetchMaterialsInfo">获取材料信息</el-button>
      <el-carousel :interval="2000" arrow="always">
        <el-carousel-item v-for="(info, index) in materialsInfo" :key="`material-${index}`">
          <el-card class="material-card" shadow="hover">
            <h2>{{ info.name }}</h2>
            <p><strong>ID:</strong> {{ info.id }}</p>
            <p><strong>数量:</strong> {{ info.quantity }}</p>
            <p><strong>详细:</strong> {{ info.details }}</p>
          </el-card>
        </el-carousel-item>
      </el-carousel>
      <!-- 下订单部分 -->
      <h2>下订单</h2>
      <el-form @submit.prevent="placeOrder" class="order-form">
        <el-form-item class="form-item">
          <el-input v-model="materialId" placeholder="Material ID"></el-input>
        </el-form-item>
        <el-form-item class="form-item">
          <el-input v-model="quantity" placeholder="Quantity"></el-input>
        </el-form-item>
        <el-form-item class="form-item">
          <el-button type="success" native-type="submit">下订单</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import Web3 from 'web3';
  import { rawMaterialsInfoAddress, rawMaterialsInfoABI, ordersManagementAddress, ordersManagementABI } from '../contracts/config';
  
  export default {
    data() {
      return {
        web3: null,
        rawMaterialsInfoContract: null,
        ordersManagementContract: null,
        materialsInfo: [],
        materialId: '',
        quantity: ''
      };
    },
    mounted() {
      this.initWeb3();
    },
    methods: {
      async fetchMaterialsInfo() {
        const materialsInfoArray = await this.rawMaterialsInfoContract.methods.getMaterialsInfo().call();
        this.materialsInfo = materialsInfoArray.ids.map((id, index) => ({
          id,
          name: materialsInfoArray.names[index],
          quantity: materialsInfoArray.quantities[index],
          details: materialsInfoArray.detailsList[index]
        }));
      },
      async placeOrder() {
  if (!this.materialId || !this.quantity) {
    this.$message.error("请输入数量和ID");
    return;
  }
  const accounts = await this.web3.eth.getAccounts();
  await this.ordersManagementContract.methods.placeOrder(this.materialId, this.quantity).send({ from: accounts[0], gas: 3000000 });
  this.materialId = '';
  this.quantity = '';
  this.$message({
    message: '下订单成功',
    type: 'success'
  });
  },
      initWeb3() {
        this.web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        this.initContracts();
      },
      initContracts() {
        this.rawMaterialsInfoContract = new this.web3.eth.Contract(rawMaterialsInfoABI, rawMaterialsInfoAddress);
        this.ordersManagementContract = new this.web3.eth.Contract(ordersManagementABI, ordersManagementAddress);
      }
    }
  };
  </script>
