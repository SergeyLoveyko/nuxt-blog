<template>
  <el-table
    :data="posts"
    style="width: 100%"
  >
    <el-table-column 
      prop="title"
      label="Назва"
    />

    <el-table-column label="Дата">
      <template slot-scope="{row: {date}}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ new Date(date).toLocaleString() }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Перегляди">
      <template slot-scope="{row: {views}}">
        <i class="el-icon-view"></i>
        <span style="margin-left: 10px">{{ views }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Коментарі">
      <template slot-scope="{row: {comments}}">
        <i class="el-icon-s-comment"></i>
        <span style="margin-left: 10px">{{ comments.length }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="Дія">
      <template slot-scope="{row}">
        <el-tooltip effect="dark" content="Відкрити пост" placement="top">
          <el-button
            icon="el-icon-edit"
            type="primary"
            circle
            @click="open(row._id)"
          />
        </el-tooltip>

        <el-tooltip effect="dark" content="Видалити пост" placement="top">
          <el-button
            icon="el-icon-delete"
            type="danger"
            circle
            @click="remove(row._id)"
          />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  async asyncData({store}) {
    const posts = await new store.dispatch('post/fetchAdmin')
    return {posts}
  },
  methods: {
    open(id) {
      console.log( '<<< Click OPEN post >>>' )
      this.$router.push(`/admin/post/${id}`)
    },
    async remove(id) {
      try {
        await this.$confirm('Ви дійсно хочете видалити пост?', 'Увага!', {
          confirmButtonText: 'Так',
          cancelButtonText: 'Скасувати',
          type: 'warning'
        })
        // console.log( id );
        await this.$store.dispatch('post/remove', id)
        this.posts = this.posts.filter(p => p._id !== id)

        this.$message.success('Пост видалений')
      } catch (e) {

      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>