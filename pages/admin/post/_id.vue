<template>
  <div class="page-wrap">
    <el-breadcrumb class="mb-1" separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item> -->
      <el-breadcrumb-item to="/admin/list">Пости</el-breadcrumb-item>
      <el-breadcrumb-item> {{ post.title }} </el-breadcrumb-item>
    </el-breadcrumb>

    <el-form 
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <!-- <h2>Увійти до панелі адміністратора</h2> -->

      <el-form-item label="Текст у форматі .md або .html" prop="text">
        <el-input
          type="textarea"
          v-model="controls.text"
          resize="none"
          :rows="10"
        />
      </el-form-item>

      <div class="mb-1">
        <small class="mr-2">
          <i class="el-icon-time"></i>
          <span>{{ new Date(post.date).toLocaleString() }}</span>
        </small>

        <small>
          <i class="el-icon-view"></i>
          <span>{{ post.views }}</span>
        </small>
      </div>

      <el-form-item>
        <el-button 
          type="primary"
          native-type="submit"
          round
          :loading="loading"
        >
          Оновити
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  head() {
    return {
      title: `Пост | ${this.post.title}`
    }
  },
  validate({params}) {
    return Boolean(params.id) 
  },
  async asyncData({store, params,error}) {
    try {
      const post = await store.dispatch('post/fetchAdminById', params.id)
      return {post}
    } catch (e) {
      error({ statusCode: 404, message: 'Пост не знайдено' }) // ← иначе будет пустой алерт
    }
  },
  data() {
    return {
      loading: false,
      controls: {
        text: ''
      },
      rules: {
        text: [
          { required: true, message: "Текст не повинен бути порожнім", trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    if (!this.post) {
      console.warn('❌ post не загружен в mounted')
    } else {
      this.controls.text = this.post.text
    }
  },
  methods: {
    onSubmit() {
      if (!this.post?._id) {
        console.warn('❌ Нет ID поста, отмена обновления')
        return
      }

      this.$refs.form.validate(async valid => {

        if(valid) {
          this.loading = true

          const formData = {
            text: this.controls.text,
            id: this.post._id
          }

          try {
            await this.$store.dispatch('post/update', formData)
            this.$message.success('Пост оновлено')
            this.loading = false
          } catch (e) {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 .page-wrap {
  width: 600px;
 }

 .mr-2 {
  margin-right: 2rem;
 }
</style>