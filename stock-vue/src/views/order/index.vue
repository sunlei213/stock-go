<template>
  <div class="order-container">
    <div class="header">
      <h2>订单管理</h2>
    </div>

    <el-table :data="orders" style="width: 100%" v-loading="loading">
      <el-table-column prop="order_no" label="订单编号" width="180" />
      <el-table-column prop="stock_code" label="股票代码" width="120" />
      <el-table-column prop="stock_name" label="股票名称" width="120" />
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
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" width="180" />
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button
            v-if="row.status === 'pending'"
            type="primary"
            link
            @click="handleCancel(row)"
          >
            取消
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        v-model:current-page="queryParams.page"
        v-model:page-size="queryParams.page_size"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

interface Order {
  id: number
  order_no: string
  stock_code: string
  stock_name: string
  trade_type: 'buy' | 'sell'
  price: number
  quantity: number
  amount: number
  status: 'pending' | 'completed' | 'cancelled'
  created_at: string
}

const loading = ref(false)
const orders = ref<Order[]>([])
const total = ref(0)

const queryParams = reactive({
  page: 1,
  page_size: 10
})

const getStatusType = (status: string) => {
  switch (status) {
    case 'pending':
      return 'warning'
    case 'completed':
      return 'success'
    case 'cancelled':
      return 'info'
    default:
      return ''
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return '待处理'
    case 'completed':
      return '已完成'
    case 'cancelled':
      return '已取消'
    default:
      return status
  }
}

const fetchOrders = async () => {
  loading.value = true
  try {
    // TODO: 从后端获取数据
    orders.value = []
    total.value = 0
  } catch (error) {
    console.error('获取订单列表失败:', error)
  } finally {
    loading.value = false
  }
}

const handleSizeChange = (val: number) => {
  queryParams.page_size = val
  fetchOrders()
}

const handleCurrentChange = (val: number) => {
  queryParams.page = val
  fetchOrders()
}

const handleCancel = async (row: Order) => {
  try {
    await ElMessageBox.confirm('确定要取消该订单吗？', '提示', {
      type: 'warning'
    })
    // TODO: 调用取消订单接口
    ElMessage.success('取消成功')
    fetchOrders()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('取消订单失败:', error)
    }
  }
}

onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
.order-container {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style> 