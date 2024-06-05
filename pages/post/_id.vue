<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>Post title</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
          <small>Back</small>
        </nuxt-link>
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time"></i>
          {{ new Date().toLocaleString() }}
        </small>
        <small>
          <i class="el-icon-view"></i>
          43
        </small>
      </div>
      <div class="post-image">
        <img 
          src="https://beechcraft.txtav.com/-/media/beechcraft/images/aircraft/bonanza/g36/exterior-gallery/bonanza-ground-03-2022.ashx?la=en&h=400&w=800&hash=6032A15F391F22B677DF6A7A6F8D26ED" 
          alt="Post image"
        >
      </div>
    </header>
    <main class="post-content">
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
    </main>
    <footer>
      <!-- Form -->

      <div class="comments" v-if="true">
        <app-comment 
          v-for="comment in 4"
          :key="comment"
          :comment="comment"
        />
      </div>
      <div class="text-center" v-else>Коментов нема</div>
    </footer>
  </article>
</template>

<script>
import AppComment from '@/components/main/Comment.vue'

export default {
  components: {AppComment},
  validate({params}) {
    return Boolean(params.id)
  }
}
</script>

<style lang="scss" scoped>
  .post {
    margin: 0 auto;
    max-width: 600px;
  }

  .post-header {
    margin-bottom: 1.5rem;
  }

  .post-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .el-icon-back {
  }

  .post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;
  }

  .el-icon-time {
  }

  .el-icon-view {
  }

  .post-image img {
    width: 100%;
    height: auto;
  }

  .post-content {
    margin-bottom: 2rem;
  }

</style>