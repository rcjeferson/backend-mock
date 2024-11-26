import { Router } from 'express'
import { createUserController } from '../controllers/create/index.js'
import { listUsersController } from '../controllers/list/index.js'
import { deleteUserController } from '../controllers/delete/index.js'

const usersRoutes = Router()

usersRoutes.post('/', createUserController)
usersRoutes.get('/', listUsersController)
usersRoutes.delete('/:id', deleteUserController)

export { usersRoutes }
