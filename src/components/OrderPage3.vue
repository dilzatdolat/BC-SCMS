<template>
  <div>
    <h1>订单状态</h1>
    <el-table :data="orderList.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%">
      <el-table-column prop="materialId" label="原材料ID" width="100"></el-table-column>
      <el-table-column prop="materialName" label="原材料名称" width="150"></el-table-column>
      <el-table-column prop="quantity" label="数量" width="100"></el-table-column>
      <el-table-column prop="status" label="订单状态" width="150"></el-table-column>
      <el-table-column prop="traceabilityId" label="可追溯ID" width="150"></el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="prev, pager, next"
    >
    </el-pagination>
  </div>
</template>

<script>
import Web3 from 'web3';
import { ManufacturerInventoryABI, ManufacturerInventoryAddress } from '../contracts/config';

export default {
  data() {
    return {
      web3: null,
      manufacturerInventoryContract: null,
      orderList: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      materialNames: ['Q235B碳钢', '红松', '硅胶', '聚乙烯(LDPE)', '美棉', '铁矿石', '硫酸', '', '', '', '工程塑料']
    };
  },
  mounted() {
    this.initWeb3();
    this.fetchOrderList();
  },
  methods: {
    initWeb3() {
      this.web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      this.initContracts();
    },
    initContracts() {
      this.manufacturerInventoryContract = new this.web3.eth.Contract(
        ManufacturerInventoryABI,
        ManufacturerInventoryAddress
      );
    },
    async fetchOrderList() {
      const result = await this.manufacturerInventoryContract.methods.getAllMyOrders().call();

      const materialIds = result[0];
      const quantities = result[1];
      const statuses = result[2];
      const traceabilityIds = result[3];

      this.orderList = materialIds.map((materialId, index) => ({
        materialId,
        materialName: this.materialNames[materialId] || '未知原材料',
        quantity: quantities[index],
        status: this.parseOrderStatus(statuses[index]),
        traceabilityId: traceabilityIds[index]
      }));
      this.total = this.orderList.length;
    },
    parseOrderStatus(statusCode) {
      const statusMap = {
        "0": "待定",
        "1": "确认",
        "2": "拒绝"
      };
      return statusMap[statusCode] || "未知状态";
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    }
  }
};
</script>
