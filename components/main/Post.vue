<template>
  <el-card 
    class="post"
    shadow="hover"
    :body-style="{padding: 0}"
  >
    <header class="post-header" slot="header">
      <h3>{{ post.title }}</h3>

      <small>
        <i class="el-icon-time"></i>
        {{ new Date(post.date).toLocaleString() }}
      </small>
    </header>
    <div class="post-body">
      <img 
        class="post-img"
        :src="post.imageUrl"
        alt="post image"
      >
    </div>
    <footer class="post-footer">
      <el-button round @click="openPost">Вiдкрити</el-button>

      <span>
        <i class="el-icon-postcard"></i>

        {{ post.comments.length }}
      </span>
    </footer>
  </el-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    openPost() {
      const id = this.post._id
      this.$router.push(`/post/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .post {
    margin-bottom: 1.5rem;
  }

  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .post-body {
    // margin-bottom: 1rem;
  }

  .post-img {
    width: 100%;
    height: auto;
  }
  
  .post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
</style>