const posts = [
  {title: 'My friends',
    date: new Date(),
    views: 8,
    comments: [1, 2],
    _id: 'id_1'
  },
  {title: 'How wonderful',
    date: new Date(),
    views: 3,
    comments: [1, 2, 3],
    _id: 'id_2'
  },
  {title: 'The car is red',
    date: new Date(),
    views: 16,
    comments: [1],
    _id: 'id_3'
  }
]

export const actions = {
  async fetchAdmin({commit}) {
    try {
      return await this.$axios.$get('api/post/admin')
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
    // return await new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(posts)
    //   }, 1000)
    // })
  },
  async remove({commit}, id) {
    try {
      return await this.$axios.$delete(`api/post/admin/${id}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async update({commit}, {id, text}) {
    try {
      return await this.$axios.$put(`api/post/admin/${id}`, {text})
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async create({commit}, {title, text, image}) {

    try {
      const fd = new FormData()

      fd.append('title', title)
      fd.append('text', text)
      fd.append('image', image, image.name)

      return await this.$axios.$post('/api/post/admin', fd)

      // return await new Promise(resolve => {
      //   setTimeout(() => {
      //     resolve()
      //   }, 1000)
      // })

    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async fetchAdminById({commit}, id) {
    try {
      return await this.$axios.$get(`api/post/admin/${id}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }

    // return await new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(posts.find(p => p._id === id))
    //   }, 1000)
    // })
  }
}