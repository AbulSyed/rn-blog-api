const express = require('express')
const Blog = require('../models/blog')
const router = new express.Router()

router.post('/blogs', async (req, res) => {
  const blog = new Blog(req.body)

  try {
    await blog.save()
    res.status(201).send(blog)
  }catch(e){
    res.status(400).send()
  }
})

router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({})
    res.status(200).send(blogs)
  }catch(e){
    res.status(400).send()
  }
})

router.get('/blogs/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const blog = await Blog.findOne({ _id })
    if(!blog){
      return res.status(404).send()
    }
    res.status(200).send(blog)
  }catch(e){
    res.status(400).send()
  }
})

router.patch('/blogs/:id', async (req, res) => {
  const _id = req.params.id

  const keys = Object.keys(req.body)
  const allowedUpdates = ['title', 'content']
  const isValidUpdate = keys.every(key => {
    return allowedUpdates.includes(key)
  })

  if(!isValidUpdate){
    return res.status(400).send('Invalid update')
  }

  try {
    const blog = await Blog.findOne({ _id })
    if(!blog){
      res.status(404).send()
    }
    keys.forEach(key => blog[key] = req.body[key])
    await blog.save()
    res.status(200).send(blog)
  }catch(e){
    res.status(400).send()
  }
})

router.delete('/blogs/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const blog = await Blog.findOneAndDelete({ _id })
    if(!blog){
      return res.status(404).send()
    }
    res.status(200).send(blog)
  }catch(e){
    res.status(400).send()
  }
})

module.exports = router