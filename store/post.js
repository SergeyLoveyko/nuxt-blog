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
  async fetchAdmin({}) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(posts)
      }, 1000)
    })
  },
  async remove({}, id) {
    
  },
  async update({}, {id, text}) {
    
  },
  async create({commit}, {title, text, image}) {

    try {
      const fd = new FormData()

      fd.append('title', title)
      fd.append('text', text)
      fd.append('image', image, image.name)

      return await new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })

    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },
  async fetchAdminById({}, id) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(posts.find(p => p._id === id))
      }, 1000)
    })
  }
}