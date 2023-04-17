import express from 'express'
import path from 'path'
const app = express()

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const port = process.env.PORT || 8080
app.listen(port)

console.log('Listening on port ' + port) // eslint-disable-line no-console
