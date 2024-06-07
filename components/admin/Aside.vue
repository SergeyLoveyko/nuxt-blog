<template>
  <el-menu
    router
    :style="{height: '100%'}"
    :default-active="$route.path"
  >
    <el-menu-item index="/admin">
      <i class="el-icon-menu"></i>
      <span>Аналітика</span>
    </el-menu-item>
    <el-menu-item index="/admin/create">
      <i class="el-icon-edit-outline"></i>
      <span>Створити</span>
    </el-menu-item>
    <el-menu-item index="/admin/list">
      <i class="el-icon-tickets"></i>
      <span>Пости</span>
    </el-menu-item>
    <el-menu-item index="/admin/user">
      <i class="el-icon-user"></i>
      <span>Користувачі</span>
    </el-menu-item>
    <el-menu-item index="/admin/logout">
      <i class="el-icon-setting"></i>
      <span>Вийти</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>

</style>