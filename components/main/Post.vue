<template>
  <el-card 
    class="post"
    shadow="hover"
    :body-style="{padding: 0}"
  >
    <header class="post-header" slot="header">
      <h3>Post title</h3>

      <small>
        <i class="el-icon-time"></i>
        {{ new Date().toLocaleString() }}
      </small>
    </header>
    <div class="post-body">
      <img 
        class="post-img"
        src="https://beechcraft.txtav.com/-/media/beechcraft/images/aircraft/bonanza/g36/exterior-gallery/bonanza-ground-03-2022.ashx?la=en&h=400&w=800&hash=6032A15F391F22B677DF6A7A6F8D26ED"
        alt="post image"
      >
    </div>
    <footer class="post-footer">
      <el-button round @click="openPost">Вiдкрити</el-button>

      <span>
        <i class="el-icon-postcard"></i>

        12
      </span>
    </footer>
  </el-card>
</template>

<script>
export default {
  methods: {
    openPost() {
      console.log('Open post')
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