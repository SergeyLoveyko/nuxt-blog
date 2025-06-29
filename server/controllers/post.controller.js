const Post = require('../models/post.model')

module.exports.create = async (req, res) => {   //  response
  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    imageUrl: `/${req.file.filename}`
  })

  try {
    await post.save()
    res.status(201).json(post)
  } catch(e) {
    res.status(500).json({ message: 'Помилка сервера', error: e.message })
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort({date: -1})
    res.json(posts)
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.getById = async (req, res) => {
  try{
    const post = await Post.findById(req.params.id).populate('comments')

    if (!post) {
      return res.status(404).json({ message: 'Пост не знайдено' })
    }

    res.json(post)
  } catch(e) {
    console.log('>>> [GET BY ID ERROR]', e)
    res.status(500).json({ message: 'Помилка отримання посту', error: e.message, e })
  }
}

module.exports.update = async (req, res) => {
  const $set = {
    text: req.body.text
  }
  try {
    const post = await Post.findOneAndUpdate({
      _id: req.params.id
    }, {$set}, {new: true})
    res.json(post)
  } catch(e) {
    console.log('>>> [UPDATE ERROR]', e)
    res.status(500).json({ message: 'Ошибка при обновлении поста' }, e)
  }
}

module.exports.remove = async (req, res) => {
  try{
    await Post.deleteOne({_id: req.params.id})
    res.json({message: 'Пост видалений'})
  } catch(e) {
    console.log('>>> [REMOVE ERROR]', e)
    res.status(500).json({ message: 'Помилка при видаленні посту' })
  }
}

module.exports.addView = async (req, res) => {
  const $set = {
    views: ++req.body.views
  }
  try{
    await Post.findOneAndUpdate({_id: req.params.id}, {$set})
    res.status(204).json()
  } catch(e) {
    res.status(500).json(e)
  }
}