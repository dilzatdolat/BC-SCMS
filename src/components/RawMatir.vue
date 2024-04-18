<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <h1>原材料管理</h1>
      </el-col>
    </el-row>
    <el-row :gutter="20" justify="center">
      <el-col :span="12">
        <el-card class="box-card">
          <template v-slot:header>
            <span>{{ updateMode ? '更新原材料' : '添加原材料' }}</span>
          </template>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input v-model="material.name" placeholder="名称"></el-input>
            </el-col>
            <el-col :span="12">
              <el-input-number v-model="material.quantity" :min="0" label="数量"></el-input-number>
            </el-col>
            <el-col :span="24">
              <el-input v-model="material.details" placeholder="详细信息"></el-input>
            </el-col>
            <el-col :span="24">
              <el-button type="primary" @click="addMaterial">{{ updateMode ? '更新' : '添加' }}</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" justify="center">
      <el-col :span="24">
        <el-card class="box-card" shadow="hover">
          <template v-slot:header>
            <span>原材料列表</span>
          </template>
          <el-list>
            <el-list-item v-for="material in sortedMaterials" :key="material.id" @click="fetchMaterial(material.id)" class="material-item">
              <el-list-item-section>
                <div class="material-name">
                  {{ material.name }}
                  <hr class="material-line">
                </div>
              </el-list-item-section>
            </el-list-item>
          </el-list>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-if="selectedMaterial" :gutter="20" justify="center">
      <el-col :span="12">
        <el-card>
          <h3>{{ selectedMaterial.name }}</h3>
          <p>库存量: {{ selectedMaterial.quantity }}</p>
          <p>详细信息: {{ selectedMaterial.details }}</p>
          <el-button @click="enableUpdateMode">修改</el-button>
          <el-button @click="deleteMaterial(selectedMaterialId)" type="danger">删除</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" justify="center">
      <el-col :span="24">
        <el-card class="box-card">
          <template v-slot:header>
            <span>库存量统计和原材料占比</span>
          </template>
          <div class="inventory-stats">
            <div class="total-quantity">总库存量: {{ totalQuantity }}</div>
            <div class="pie-chart">
              <canvas ref="pieChart"></canvas>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Web3 from 'web3';
import { rawMaterialsManagementABI, rawMaterialsManagementAddress } from '../contracts/config';
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      web3: null,
      rawMaterialsManagementContract: null,
      currentAccount: null,
      material: {
        name: '',
        quantity: 0,
        details: '',
        category: ''
      },
      selectedMaterial: null,
      selectedMaterialId: null,
      materials: [],
      updateMode: false,
      pieChart: null,
    };
  },
  computed: {
    sortedMaterials() {
      return this.materials.slice().sort((a, b) => a.name.localeCompare(b.name));
    },
    totalQuantity() {
      return this.materials.reduce((total, material) => total + parseInt(material.quantity), 0);
    }
  },
  methods: {
    async addMaterial() {
      if (!this.material.name || !this.material.quantity || !this.material.details || !this.material.category) {
        alert('请填写原材料名称、数量、详细信息和类别！');
        return;
      }

      if (!this.updateMode) {
        await this.rawMaterialsManagementContract.methods.addRawMaterial(this.material.name, this.material.quantity, this.material.details, this.material.category).send({ from: this.currentAccount });
      } else {
        await this.rawMaterialsManagementContract.methods.updateRawMaterial(this.selectedMaterialId, this.material.name, this.material.quantity, this.material.details, this.material.category).send({ from: this.currentAccount });
        this.updateMode = false;
      }
      this.material = { name: '', quantity: 0, details: '', category: '' };
      this.fetchMaterials();
    },
    async fetchMaterial(id) {
  const result = await this.rawMaterialsManagementContract.methods.getRawMaterial(id).call();
  this.selectedMaterial = { name: result[0], quantity: result[1], details: result[2], category: result[3] };
  this.selectedMaterialId = id;
},
    async fetchMaterials() {
  const materialCount = await this.rawMaterialsManagementContract.methods.nextMaterialId().call();
  this.materials = [];
  for (let i = 0; i < materialCount; i++) {
    const result = await this.rawMaterialsManagementContract.methods.rawMaterials(i).call();
    this.materials.push({ id: i, name: result.name, quantity: result.quantity, details: result.details, category: result.category });
  }
  this.updatePieChart();
},
    enableUpdateMode() {
      this.updateMode = true;
      this.material = { ...this.selectedMaterial };
    },
    async deleteMaterial(id) {
      await this.rawMaterialsManagementContract.methods.deleteRawMaterial(id).send({ from: this.currentAccount });
      this.selectedMaterial = null;
      this.selectedMaterialId = null;
      this.fetchMaterials();
    },
    updatePieChart() {
      if (this.pieChart) {
        this.pieChart.destroy();
      }
      const ctx = this.$refs.pieChart.getContext('2d');
      this.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.materials.map(material => material.name),
          datasets: [{
            data: this.materials.map(material => Number(material.quantity)),
            backgroundColor: this.generateColors(this.materials.length)
          }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: '原材料占比'
          }
        }
      });
    },
    generateColors(count) {
      const colors = [];
      for (let i = 0; i < count; i++) {
        let color = '#';
        for (let j = 0; j < 6; j++) {
          color += Math.floor(Math.random() * 16).toString(16);
        }
        colors.push(color);
      }
      return colors;
    }
  },
  async created() {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        this.rawMaterialsManagementContract = new this.web3.eth.Contract(rawMaterialsManagementABI, rawMaterialsManagementAddress);
        const accounts = await this.web3.eth.getAccounts();
        this.currentAccount = accounts[0];
        this.fetchMaterials();
      } catch (error) {
        console.error("您需要允许 MetaMask。");
      }
    } else {
      console.log('请安装MetaMask');
    }
  }
};
</script>


<style scoped>
.material-item {
  cursor: pointer;
}
.material-name {
  font-weight: bold;
  font-size: 1.2rem;
}
.material-line {
  margin-top: 5px;
  border: none;
  border-top: 1px solid #ccc;
}
.inventory-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.total-quantity {
  font-size: 1.2rem;
  font-weight: bold;
}
.pie-chart {
  max-width: 400px;
}
</style>

