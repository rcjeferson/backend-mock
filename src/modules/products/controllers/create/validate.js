import Joi from 'joi'
import logger from '../../../../shared/config/logger/index.js'
import { AppError } from '../../../../shared/config/errors/AppError.js'
import { PRODUCTS_STATUS } from '../../constants/products.js'

const validateCreateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    status: Joi.string().valid(...Object.values(PRODUCTS_STATUS)).required(),
  })

  const {
    error,
    value,
  } = schema.validate(data, {
    abortEarly: false,
  })

  if (error) {
    logger.warn(error, 'Create product validation fail')

    throw new AppError(error.details, 400)
  }

  return value
}

export { validateCreateProduct }
