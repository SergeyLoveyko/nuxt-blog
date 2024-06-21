<template>
  <el-form 
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <h2>Створити користувача</h2>

    <el-form-item label="Логін" prop="login">
      <el-input v-model.trim="controls.login" />
    </el-form-item>

    <div class="mb-2">
      <el-form-item label="Пароль" prop="password">
        <el-input v-model.trim="controls.password" type="password" />
      </el-form-item>
    </div>

    <el-form-item>
      <el-button 
        type="primary"
        native-type="submit"
        round
        :loading="loading"
      >
        Створити
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
        login: '',
        password: ''
      },
      rules: {
        login: [
          { required: true, message: "Введіть логін", trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Введіть пароль', trigger: 'blur' },
          { min: 6, message: 'Пароль має бути не менше 6 символів', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true

          try {
            const formData = {
              login: this.controls.login,
              password: this.controls.password
            }

            await this.$store.dispatch('auth/createUser', formData)
            this.$message.success('Новий користувач доданий')
            this.controls.login = ''
            this.controls.password = ''
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
  form {
    width: 600px;
  }
</style>