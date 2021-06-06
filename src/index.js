const express = require('express')
require('./db/mongoose')
const cors = require('cors')
const blogRouter = require('./router/blog')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(blogRouter)

app.listen(port, () => {
  console.log('Server running on port', port)
})