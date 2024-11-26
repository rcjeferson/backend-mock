import { Router } from 'express'
import { authPublic } from '../../modules/authenticator/controllers/auth-public/index.js'
import { usersRoutes } from '../../modules/users/routes/users.routes.js'
import { productsRoutes } from '../../modules/products/routes/products.routes.js'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/products', [authPublic], productsRoutes)

export default routes
