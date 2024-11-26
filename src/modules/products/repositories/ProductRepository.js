import logger from '../../../shared/config/logger/index.js'
import { AppError } from '../../../shared/config/errors/AppError.js'
import { productsTable } from '../../../infra/database/index.js'

class ProductRepository {
  async findById(id) {
    try {
      const user = productsTable.find((userItem) => userItem.id === id)

      return user
    } catch (error) {
      logger.error(error, 'Error on ProductRepository.findById')

      throw new AppError('Internal Server Error', 500)
    }
  }

  async findByEmail(email) {
    try {
      const user = productsTable.find((userItem) => userItem.email === email)

      return user
    } catch (error) {
      logger.error(error, 'Error on ProductRepository.findByEmail')

      throw new AppError('Internal Server Error', 500)
    }
  }

  async list() {
    try {
      return productsTable
    } catch (error) {
      logger.error(error, 'Error on ProductRepository.listUsers')

      throw new AppError('Internal Server Error', 500)
    }
  }

  async create(user_create) {
    try {
      productsTable.push(user_create)

      return user_create
    } catch (error) {
      logger.error(error, 'Error on ProductRepository.create')

      throw new AppError('Internal Server Error', 500)
    }
  }

  async delete(id) {
    try {
      productsTable.splice(productsTable.findIndex((userItem) => userItem.id === id), 1)
    } catch (error) {
      logger.error(error, 'Error on ProductRepository.delete')

      throw new AppError('Internal Server Error', 500)
    }
  }
}

export {
  ProductRepository,
}
