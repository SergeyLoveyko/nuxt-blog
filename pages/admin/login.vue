<template>
  <el-card
    shadow="always"
    :style="{width: '500px'}"
  >
    <el-form 
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
    >
      <h2>Увійти до панелі адміністратора</h2>

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
          Увійти
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  layout: 'empty',
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
  mounted() {
    const {message} = this.$route.query

    if (message === 'login') {
      this.$message.info('Для початку увійдіть у систему')
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

            await this.$store.dispatch('auth/login', formData)
            this.$router.push('/admin')

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

</style>