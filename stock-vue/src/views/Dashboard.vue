<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>股票总数</span>
            </div>
          </template>
          <div class="card-body">
            <div class="number">{{ stockCount }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>交易总数</span>
            </div>
          </template>
          <div class="card-body">
            <div class="number">{{ tradeCount }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>持仓市值</span>
            </div>
          </template>
          <div class="card-body">
            <div class="number">¥{{ totalValue }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>总盈亏</span>
            </div>
          </template>
          <div class="card-body">
            <div class="number" :class="{ 'profit': totalProfit > 0, 'loss': totalProfit < 0 }">
              ¥{{ totalProfit }}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getStocks } from '@/api/stock'
import { getTrades } from '@/api/trade'

const stockCount = ref(0)
const tradeCount = ref(0)
const totalValue = ref(0)
const totalProfit = ref(0)

onMounted(async () => {
  try {
    const [stocks, trades] = await Promise.all([
      getStocks(),
      getTrades()
    ])
    stockCount.value = stocks.length
    tradeCount.value = trades.length
    // TODO: 计算持仓市值和总盈亏
  } catch (error) {
    console.error('获取数据失败:', error)
  }
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-body {
  text-align: center;
}
.number {
  font-size: 24px;
  font-weight: bold;
}
.profit {
  color: #67C23A;
}
.loss {
  color: #F56C6C;
}
</style> 