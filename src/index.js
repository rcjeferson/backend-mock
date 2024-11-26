import express from 'express'
import { randomUUID } from 'crypto'
import dotenv from 'dotenv'
import cors from 'cors'
import logger from './shared/config/logger/index.js'
import routes from './infra/routes/index.js'

dotenv.config()
const app = express()

app.use((request, response, next) => {
  request.request_id = randomUUID()

  logger.setRequestId(request.request_id)

  response.on('finish', () => {
    logger.resetConfig()
  })

  next()
})

app.use('/', express.static('src/public'))

app.use(cors())
app.use(express.json())

app.use(routes)

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
  res.header('Access-Control-Expose-Headers', 'x-access-token')
  next()
})

app.use((error, _request, response, _next) => {
  logger.error({ message: 'Internal server error', error })
  response.status(500).json()
})

app.use((request, response, _next) => {
  const {
    user_id,
    method,
    url,
    query,
    body,
  } = request

  logger.warn({
    message: 'Route not found',
    data: {
      user_id,
      method,
      url,
      query,
      body,
    },
  })

  response.status(404).json({ message: 'not found' })
})

app.listen(process.env.PORT || 3000, () => logger.info('Server listen on port 3000'))
