<template>
  <el-form 
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <h1 class="mb-1">Створити новий пост</h1>

    <el-form-item label="Введіть назву посту" prop="title">
      <el-input
        v-model.trim="controls.title"
      />
    </el-form-item>

    <el-form-item label="Текст у форматі .md або .html" prop="text">
      <el-input
        type="textarea"
        v-model.trim="controls.text"
        resize="none"
        :rows="10"
      />
    </el-form-item>

    <el-form-item>
      <el-button 
        type="primary"
        native-type="submit"
        round
        :loading="loading"
      >
        Створити пост
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  data() {
    return {
      loading: false,
      controls: {
        title: '',
        text: ''
      },
      rules: {
        title: [
          { required: true, message: "Назва посту не може бути порожньою", trigger: 'blur' }
        ],
        text: [
          { required: true, message: "Текст не повинен бути порожнім", trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if(valid) {
          this.loading = true

          const formData = {
            title: this.controls.title,
            text: this.controls.text
          }

          try {
            await this.$store.dispatch('post/create', formData)
            this.controls.title = ''
            this.controls.text = ''
            this.$message.success('Пост створений')
            // this.loading = false
          } catch (e) {} finally {
            this.loading = false
            //  можно прописать один раз через такую конструкцию, чтоб не дублировать
          }
        }
      }) 
    }
  }
}
</script>

<style lang="scss" scoped>
  form {
    width: 600px;
  }
</style>