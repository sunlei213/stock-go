<template>
  <div class="stock-list">
    <div class="header">
      <h2>股票列表</h2>
      <el-button type="primary" @click="handleAdd">添加股票</el-button>
    </div>

    <el-table :data="stocks" style="width: 100%">
      <el-table-column prop="stockCode" label="股票代码" />
      <el-table-column prop="stockName" label="股票名称" />
      <el-table-column prop="quantity" label="数量" />
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="nowPrice" label="当前价格" />
      <el-table-column prop="loss" label="亏损" />
      <el-table-column prop="lossPer" label="亏损比例" />
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
      :title="isEdit ? '编辑股票' : '添加股票'"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="股票代码" prop="stockCode">
          <el-input v-model="form.stockCode" />
        </el-form-item>
        <el-form-item label="股票名称" prop="stockName">
          <el-input v-model="form.stockName" />
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input-number v-model="form.quantity" :min="0" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="form.price" :min="0" :precision="2" />
        </el-form-item>
        <el-form-item label="当前价格" prop="nowPrice">
          <el-input-number v-model="form.nowPrice" :min="0" :precision="2" />
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

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Stock } from '../../types/stock'
import { getStocks, createStock, updateStock, deleteStock } from '../../api/stock'

const stocks = ref<Stock[]>([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const currentId = ref<number | null>(null)

const form = reactive({
  stockCode: '',
  stockName: '',
  quantity: 0,
  price: 0,
  nowPrice: 0
})

const rules = {
  stockCode: [{ required: true, message: '请输入股票代码', trigger: 'blur' }],
  stockName: [{ required: true, message: '请输入股票名称', trigger: 'blur' }],
  quantity: [{ required: true, message: '请输入数量', trigger: 'blur' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
  nowPrice: [{ required: true, message: '请输入当前价格', trigger: 'blur' }]
}

const fetchStocks = async () => {
  try {
    stocks.value = await getStocks()
  } catch (error) {
    ElMessage.error('获取股票列表失败：' + (error as Error).message)
  }
}

const handleAdd = () => {
  isEdit.value = false
  currentId.value = null
  Object.assign(form, {
    stockCode: '',
    stockName: '',
    quantity: 0,
    price: 0,
    nowPrice: 0
  })
  dialogVisible.value = true
}

const handleEdit = (row: Stock) => {
  isEdit.value = true
  currentId.value = row.id
  Object.assign(form, row)
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
      ElMessage.error('删除失败：' + (error as Error).message)
    }
  }
}

const handleSubmit = async () => {
  try {
    if (isEdit.value && currentId.value) {
      await updateStock(currentId.value, form)
      ElMessage.success('更新成功')
    } else {
      await createStock(form)
      ElMessage.success('添加成功')
    }
    dialogVisible.value = false
    fetchStocks()
  } catch (error) {
    ElMessage.error('操作失败：' + (error as Error).message)
  }
}

onMounted(() => {
  fetchStocks()
})
</script>

<style scoped>
.stock-list {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style> 