<template>
  <el-form 
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <h1>Додати коментар</h1>

    <el-form-item label="Ваше ім'я" prop="name">
      <el-input v-model.trim="controls.name" />
    </el-form-item>

    <el-form-item label="Текст коментаря" prop="text">
      <el-input 
        type="textarea"
        v-model.trim="controls.text" 
        resize="none"
        :rows="2"
      />
    </el-form-item>

    <el-form-item>
      <el-button 
        type="primary"
        native-type="submit"
        round
      >
        Додати коментар
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      controls: {
        name: '',
        text: ''
      },
      rules: {
        name: [
          { required: true, message: "Ім'я не повинно бути порожнім", trigger: 'blur' }
        ],
        text: [
          { required: true, message: 'Залишіть свій коментар', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log( 'Form is valid' );
        } 
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>