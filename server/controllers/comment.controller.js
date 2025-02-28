const Comment = require('../models/comment.model')
const Post = require('../models/post.model')

module.exports.create = async (req, res) => {
  try {
    // const comment = new Comment({
    //   name: req.body.name,
    //   text: req.body.text,
    //   postId: req.body.postId
    // })
    // this entry can be reduced in the way

    const {name, text, postId} = req.body
    const comment = new Comment({name, text, postId})

    await comment.save()

    const post = await Post.findById(postId)
    post.comment.push(comment._id)
    await post.save()

    res.status(201).json(comment)

  } catch(e) {
    res.status(500).json(e)
  }
}