import logger from '../../../shared/config/logger/index.js'
import { AppError } from '../../../shared/config/errors/AppError.js'
import { usersTable } from '../../../infra/database/index.js'

class UserRepository {
  async findById(id) {
    try {
      const user = usersTable.find((userItem) => userItem.id === id)

      return user
    } catch (error) {
      logger.error(error, 'Error on UserRepository.findById')

      throw new AppError('Internal Server Error', 500)
    }
  }

  async findByEmail(email) {
    try {
      const user = usersTable.find((userItem) => userItem.email === email)

      return user
    } catch (error) {
      logger.error(error, 'Error on UserRepository.findByEmail')

      throw new AppError('Internal Server Error', 500)
    }
  }

  async listUsers() {
    try {
      return usersTable
    } catch (error) {
      logger.error(error, 'Error on UserRepository.listUsers')

      throw new AppError('Internal Server Error', 500)
    }
  }

  async create(user_create) {
    try {
      usersTable.push(user_create)

      return user_create
    } catch (error) {
      logger.error(error, 'Error on UserRepository.create')

      throw new AppError('Internal Server Error', 500)
    }
  }

  async delete(id) {
    try {
      usersTable.splice(usersTable.findIndex((userItem) => userItem.id === id), 1)
    } catch (error) {
      logger.error(error, 'Error on UserRepository.delete')

      throw new AppError('Internal Server Error', 500)
    }
  }
}

export {
  UserRepository,
}
