const passport = require('passport')
const {Router} = require('express')
const upload = require('../middleware/upload')
const ctr = require('../controllers/post.controller')
const router = Router()

// Admin
// /api/post/admin

// create a post
router.post(
  '/admin/',
  passport.authenticate('jwt', {session: false}),
  upload.single('image'),
  ctr.create
)

// get all posts
router.get(
  '/admin/',
  passport.authenticate('jwt', {session: false}),
  ctr.getAll
)

//  get a post
router.get(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  ctr.getById
)

//  edit a post
router.put(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  ctr.update
)

//  remove a post
router.delete(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  ctr.remove
)


// Base
// /api/post

//  get all posts for a main layout
router.get('/', ctr.getAll)

//  go to a layout post
router.get('/:id', ctr.getById)

//  add post views
router.put('/:id', ctr.addView)


module.exports = router