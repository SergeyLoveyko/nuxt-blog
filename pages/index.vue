<template>
  <!-- <Tutorial/> -->
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <app-post 
        v-for="post in 3"
        :key="post"
      />
    </el-col>
  </el-row>
</template>

<script>
import AppPost from '@/components/main/Post.vue'

export default {
  head: {
    title: "Головна"
  },
  components: {
    AppPost
  }
}
</script>
