import logger from '../../../shared/config/logger/index.js'
import { AppError } from '../../../shared/config/errors/AppError.js'
import { ProductCreateEntity } from '../entities/ProductCreate.js'
import { ProductRepository } from '../repositories/ProductRepository.js'

class ProductUseCase {
  async create(product_create) {
    const product = new ProductCreateEntity(product_create)
    const productRepository = new ProductRepository()

    const productCreated = await productRepository.create(product)

    return productCreated
  }

  async list() {
    const productRepository = new ProductRepository()
    const products = await productRepository.list()

    return products
  }

  async deleteProduct(id) {
    const productRepository = new ProductRepository()

    const product = await productRepository.findById(id)
    if (!product) {
      logger.warn({
        message: 'Product not found to delete',
        product_id: id,
      })

      throw new AppError('Product not found', 404)
    }

    await productRepository.delete(id)
  }
}

export {
  ProductUseCase,
}
