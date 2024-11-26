import { randomUUID } from 'crypto'
import { PRODUCTS_STATUS } from '../constants/products.js'

class ProductCreateEntity {
  constructor({
    id,
    name,
    status,
  }) {
    const now = new Date().toISOString()

    this.id = id || randomUUID()
    this.name = name
    this.status = status || PRODUCTS_STATUS.ACTIVE

    this.created_at = now
    this.updated_at = now
  }
}

export {
  ProductCreateEntity,
}
