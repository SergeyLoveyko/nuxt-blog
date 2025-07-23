<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>{{ post.title }}</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
          <small>Back</small>
        </nuxt-link>
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time"></i>
          {{ new Date(post.date).toLocaleString() }}
        </small>
        <small>
          <i class="el-icon-view"></i>
          {{ post.views }}
        </small>
      </div>
      <div class="post-image">
        <img 
          :src="post.imageUrl" 
          alt="Post image"
        >
      </div>
    </header>
    <main class="post-content">
      <vue-markdown> {{ post.text }} </vue-markdown>
    </main>
    <footer>
      <app-comment-form 
        v-if="canAddComent"
        @created="createCommentHandler"
      />

      <div class="comments" v-if="post.comments.length">
        <app-comment 
          v-for="comment in post.comments"
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
import AppCommentForm from '@/components/main/CommentForm.vue'

export default {
  components: {AppComment, AppCommentForm},
  async asyncData({store, params}) {
    const post = await store.dispatch('post/fetchById', params.id)
    await store.dispatch('post/addView', post)
    return {
      post: {...post, views: ++post.views}
    }
  },
  data() {
    return {
      canAddComent: true
    }
  },
  validate({params}) {
    return Boolean(params.id)
  },
  methods: {
    createCommentHandler() {
      this.canAddComent = false
    }
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