<template>
  <div class="account-container">
    <h2>账户信息</h2>
    <el-card class="account-card">
      <el-form :model="form" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" disabled />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.created_at" disabled />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const form = ref({
  username: '',
  email: '',
  created_at: ''
})

onMounted(() => {
  const user = authStore.user
  if (user) {
    form.value = {
      username: user.username,
      email: user.email || '',
      created_at: user.created_at || ''
    }
  }
})
</script>

<style scoped>
.account-container {
  padding: 20px;
}

.account-card {
  max-width: 600px;
  margin: 20px auto;
}
</style> 