import { Router } from 'express'
import { createProductController } from '../controllers/create/index.js'
import { listProductsController } from '../controllers/list/index.js'
import { deleteProductController } from '../controllers/delete/index.js'

const productsRoutes = Router()

productsRoutes.post('/', createProductController)
productsRoutes.get('/', listProductsController)
productsRoutes.delete('/:id', deleteProductController)

export { productsRoutes }
