<template>
  <div class="error-layout">
    <div class="error-content">
      <h1 class="error-title">Помилка 404</h1>
      <nuxt-link to="/">Повернутися на головну сторінку</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  .error-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .error-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4rem;
  }

  .error-title {
    color: #8f0b0b;
    margin-bottom: 1rem;
  }

</style>