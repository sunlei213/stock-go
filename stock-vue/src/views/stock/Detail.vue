<template>
  <div class="stock-detail">
    <div class="header">
      <h2>股票详情</h2>
      <el-button @click="$router.back()">返回</el-button>
    </div>

    <el-card v-loading="loading">
      <template #header>
        <div class="card-header">
          <span>{{ stock?.name }} ({{ stock?.code }})</span>
        </div>
      </template>

      <el-descriptions :column="2" border>
        <el-descriptions-item label="当前价格">
          {{ stock?.price.toFixed(2) }}
        </el-descriptions-item>
        <el-descriptions-item label="持仓数量">
          {{ stock?.quantity }}
        </el-descriptions-item>
        <el-descriptions-item label="成本价">
          {{ stock?.cost.toFixed(2) }}
        </el-descriptions-item>
        <el-descriptions-item label="盈亏">
          <span :class="['profit-text', stock?.profit >= 0 ? 'up' : 'down']">
            {{ stock?.profit >= 0 ? '+' : '' }}{{ stock?.profit.toFixed(2) }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="盈亏比例">
          <span :class="['profit-text', stock?.profit_rate >= 0 ? 'up' : 'down']">
            {{ stock?.profit_rate >= 0 ? '+' : '' }}{{ stock?.profit_rate.toFixed(2) }}%
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="市值">
          {{ stock?.market_value.toFixed(2) }}
        </el-descriptions-item>
      </el-descriptions>

      <div class="chart-container">
        <h3>历史价格走势</h3>
        <!-- TODO: 添加图表组件 -->
      </div>

      <div class="trade-history">
        <h3>交易记录</h3>
        <el-table :data="trades" style="width: 100%">
          <el-table-column prop="trade_date" label="交易日期" width="120" />
          <el-table-column prop="trade_type" label="交易类型" width="100">
            <template #default="{ row }">
              <el-tag :type="row.trade_type === 'buy' ? 'success' : 'danger'">
                {{ row.trade_type === 'buy' ? '买入' : '卖出' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格" width="100">
            <template #default="{ row }">
              {{ row.price.toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column prop="quantity" label="数量" width="100" />
          <el-table-column prop="amount" label="金额" width="120">
            <template #default="{ row }">
              {{ row.amount.toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column prop="notes" label="备注" show-overflow-tooltip />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getStock } from '@/api/stock'
import { getTrades } from '@/api/trade'
import type { Stock } from '@/types/stock'
import type { Trade } from '@/types/trade'

const route = useRoute()
const loading = ref(false)
const stock = ref<Stock | null>(null)
const trades = ref<Trade[]>([])

const fetchStock = async () => {
  loading.value = true
  try {
    const id = Number(route.params.id)
    const res = await getStock(id)
    stock.value = res.data
  } catch (error) {
    console.error('获取股票详情失败:', error)
  } finally {
    loading.value = false
  }
}

const fetchTrades = async () => {
  try {
    const id = Number(route.params.id)
    const res = await getTrades({ stock_id: id })
    trades.value = res.data
  } catch (error) {
    console.error('获取交易记录失败:', error)
  }
}

onMounted(() => {
  fetchStock()
  fetchTrades()
})
</script>

<style scoped>
.stock-detail {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  margin-top: 20px;
}

.trade-history {
  margin-top: 20px;
}

.profit-text.up {
  color: #67c23a;
}

.profit-text.down {
  color: #f56c6c;
}
</style> 