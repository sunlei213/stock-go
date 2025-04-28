<template>
  <div class="stock-container">
    <div class="header">
      <h2>股票列表</h2>
      <el-button type="primary" @click="handleAdd">添加股票</el-button>
    </div>

    <el-table :data="stocks" style="width: 100%" v-loading="loading">
      <el-table-column prop="code" label="股票代码" width="120" />
      <el-table-column prop="name" label="股票名称" width="120" />
      <el-table-column prop="price" label="当前价格" width="100">
        <template #default="{ row }">
          {{ row.price.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="持仓数量" width="100" />
      <el-table-column prop="cost" label="成本价" width="100">
        <template #default="{ row }">
          {{ row.cost.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="profit" label="盈亏" width="120">
        <template #default="{ row }">
          <span :class="['profit-text', row.profit >= 0 ? 'up' : 'down']">
            {{ row.profit >= 0 ? '+' : '' }}{{ row.profit.toFixed(2) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="profit_rate" label="盈亏比例" width="120">
        <template #default="{ row }">
          <span :class="['profit-text', row.profit_rate >= 0 ? 'up' : 'down']">
            {{ row.profit_rate >= 0 ? '+' : '' }}{{ row.profit_rate.toFixed(2) }}%
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新增股票' : '编辑股票'"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="stock-form"
      >
        <el-form-item label="股票代码" prop="code">
          <el-input v-model="form.code" />
        </el-form-item>
        <el-form-item label="股票名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="当前价格" prop="price">
          <el-input-number
            v-model="form.price"
            :precision="2"
            :step="0.01"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="持仓数量" prop="quantity">
          <el-input-number
            v-model="form.quantity"
            :min="100"
            :step="100"
          />
        </el-form-item>
        <el-form-item label="成本价" prop="cost">
          <el-input-number
            v-model="form.cost"
            :precision="2"
            :step="0.01"
            :min="0"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { getStocks, createStock, updateStock, deleteStock } from '@/api/stock'
import type { Stock, StockForm } from '@/types/stock'

const loading = ref(false)
const stocks = ref<Stock[]>([])
const dialogVisible = ref(false)
const dialogType = ref<'add' | 'edit'>('add')
const formRef = ref<FormInstance>()

const form = reactive<StockForm>({
  code: '',
  name: '',
  price: 0,
  quantity: 100,
  cost: 0
})

const rules = {
  code: [{ required: true, message: '请输入股票代码', trigger: 'blur' }],
  name: [{ required: true, message: '请输入股票名称', trigger: 'blur' }],
  price: [{ required: true, message: '请输入当前价格', trigger: 'blur' }],
  quantity: [{ required: true, message: '请输入持仓数量', trigger: 'blur' }],
  cost: [{ required: true, message: '请输入成本价', trigger: 'blur' }]
}

const fetchStocks = async () => {
  loading.value = true
  try {
    const res = await getStocks()
    stocks.value = res
  } catch (error) {
    console.error('获取股票列表失败:', error)
  } finally {
    loading.value = false
  }
}

const handleAdd = () => {
  dialogType.value = 'add'
  Object.assign(form, {
    code: '',
    name: '',
    price: 0,
    quantity: 100,
    cost: 0
  })
  dialogVisible.value = true
}

const handleEdit = (row: Stock) => {
  dialogType.value = 'edit'
  Object.assign(form, {
    id: row.id,
    code: row.code,
    name: row.name,
    price: row.price,
    quantity: row.quantity,
    cost: row.cost
  })
  dialogVisible.value = true
}

const handleDelete = async (row: Stock) => {
  try {
    await ElMessageBox.confirm('确定要删除该股票吗？', '提示', {
      type: 'warning'
    })
    await deleteStock(row.id)
    ElMessage.success('删除成功')
    fetchStocks()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除股票失败:', error)
    }
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (dialogType.value === 'add') {
          await createStock(form)
          ElMessage.success('创建成功')
        } else {
          await updateStock(form.id, form)
          ElMessage.success('更新成功')
        }
        dialogVisible.value = false
        fetchStocks()
      } catch (error) {
        console.error('保存股票失败:', error)
      }
    }
  })
}

onMounted(() => {
  fetchStocks()
})
</script>

<style scoped>
.stock-container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.stock-form {
  max-width: 400px;
  margin: 0 auto;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.profit-text.up {
  color: #67c23a;
}

.profit-text.down {
  color: #f56c6c;
}
</style> 