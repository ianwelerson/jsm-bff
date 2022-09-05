import http from 'http'
import express, { Express } from 'express'
import morgan from 'morgan'
import routes from './routes'

const router: Express = express()

// Logging
router.use(morgan('dev'))
// Parse the request
router.use(express.urlencoded({ extended: false }))
// Takes care of JSON data
router.use(express.json())

// API rules
router.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*')
  // set the CORS headers
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization')
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET')
    return res.status(200).json({})
  }
  next()
})

// Routes
router.use('/v1/', routes)

// Error handler
router.use((req, res) => {
  const error = new Error('not found')

  return res.status(404).json({
    message: error.message
  })
})

// Server definitions
const httpServer = http.createServer(router)
const PORT = process.env.PORT ?? 3000
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`))