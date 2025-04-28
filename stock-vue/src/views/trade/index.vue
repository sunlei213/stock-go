<template>
  <div class="trade-list">
    <div class="header">
      <h2>交易记录</h2>
      <el-button type="primary" @click="handleAdd">添加交易</el-button>
    </div>

    <el-table :data="trades" style="width: 100%">
      <el-table-column prop="stock.code" label="股票代码" />
      <el-table-column prop="stock.name" label="股票名称" />
      <el-table-column prop="trade_type" label="类型">
        <template #default="{ row }">
          {{ row.trade_type === 'buy' ? '买入' : '卖出' }}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格">
        <template #default="{ row }">
          {{ row.price.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="数量" />
      <el-table-column prop="notes" label="备注" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑交易' : '添加交易'"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="股票" prop="stock_id">
          <el-select v-model="form.stock_id">
            <el-option
              v-for="stock in stocks"
              :key="stock.id"
              :label="`${stock.code} - ${stock.name}`"
              :value="stock.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="trade_type">
          <el-select v-model="form.trade_type">
            <el-option label="买入" value="buy" />
            <el-option label="卖出" value="sell" />
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="form.price" :min="0" :precision="2" />
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input-number v-model="form.quantity" :min="0" />
        </el-form-item>
        <el-form-item label="备注" prop="notes">
          <el-input v-model="form.notes" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { getTrades, createTrade, updateTrade, deleteTrade } from '@/api/trade'
import { getStocks } from '@/api/stock'
import type { Trade, TradeForm } from '@/types/trade'
import type { Stock } from '@/types/stock'

const trades = ref<Trade[]>([])
const stocks = ref<Stock[]>([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref<FormInstance>()

const form = reactive<TradeForm>({
  stock_id: '',
  trade_type: 'buy',
  price: 0,
  quantity: 0,
  notes: ''
})

const rules = {
  stock_id: [{ required: true, message: '请选择股票', trigger: 'change' }],
  trade_type: [{ required: true, message: '请选择交易类型', trigger: 'change' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
  quantity: [{ required: true, message: '请输入数量', trigger: 'blur' }]
}

const fetchTrades = async () => {
  try {
    const { data } = await getTrades()
    trades.value = data
  } catch (error) {
    ElMessage.error('获取交易记录失败')
  }
}

const fetchStocks = async () => {
  try {
    const { data } = await getStocks()
    stocks.value = data
  } catch (error) {
    ElMessage.error('获取股票列表失败')
  }
}

const handleAdd = () => {
  isEdit.value = false
  Object.assign(form, {
    stock_id: '',
    trade_type: 'buy',
    price: 0,
    quantity: 0,
    notes: ''
  })
  dialogVisible.value = true
}

const handleEdit = (row: Trade) => {
  isEdit.value = true
  Object.assign(form, {
    stock_id: row.stock_id,
    trade_type: row.trade_type,
    price: row.price,
    quantity: row.quantity,
    notes: row.notes
  })
  dialogVisible.value = true
}

const handleDelete = async (row: Trade) => {
  try {
    await ElMessageBox.confirm('确定要删除这条交易记录吗？', '提示', {
      type: 'warning'
    })
    await deleteTrade(row.id)
    ElMessage.success('删除成功')
    fetchTrades()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (isEdit.value) {
          await updateTrade(form)
          ElMessage.success('更新成功')
        } else {
          await createTrade(form)
          ElMessage.success('创建成功')
        }
        dialogVisible.value = false
        fetchTrades()
      } catch (error) {
        ElMessage.error(isEdit.value ? '更新失败' : '创建失败')
      }
    }
  })
}

onMounted(() => {
  fetchTrades()
  fetchStocks()
})
</script>

<style scoped>
.trade-list {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style> 