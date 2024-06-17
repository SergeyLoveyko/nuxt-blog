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
        v-model="controls.text"
        resize="none"
        :rows="10"
      />
    </el-form-item>

    <el-button class="mb-1" type="success" pain @click="previewDialog = true">
      Передпрогляд
    </el-button>

    <el-dialog
      title="Передпрогляд"
      :visible.sync="previewDialog"
    >
      <div :key="controls.text">
        <vue-markdown> {{ controls.text }} </vue-markdown>
      </div>
    </el-dialog>

    <el-upload
      class="mb-1"
      drag
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleImageChange"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Перетягніть картинку <em>або натисніть, щоб завантажити</em></div>
      <div class="el-upload__tip" slot="tip">Файли із розширенням jpg/png</div>
    </el-upload>

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
      image: null,
      previewDialog: false,
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
    handleImageChange(file, fileList) {
      this.image = file.raw
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if(valid && this.image) {
          this.loading = true

          const formData = {
            title: this.controls.title,
            text: this.controls.text,
            image: this.image
          }

          try {
            await this.$store.dispatch('post/create', formData)
            this.controls.title = ''
            this.controls.text = ''
            this.image = null
            this.$refs.upload.clearFiles()
            this.$message.success('Пост створений')
            // this.loading = false
          } catch (e) {} finally {
            this.loading = false
            //  можно прописать один раз через такую конструкцию, чтоб не дублировать
          }
        } else {
          this.$message.warning('Форма не валідна')
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