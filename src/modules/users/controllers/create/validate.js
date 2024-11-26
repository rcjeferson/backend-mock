import Joi from 'joi'
import logger from '../../../../shared/config/logger/index.js'
import { AppError } from '../../../../shared/config/errors/AppError.js'
import { USERS_STATUS } from '../../constants/users.js'

const validateCreateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    status: Joi.string().valid(...Object.values(USERS_STATUS)),
  })

  const {
    error,
    value,
  } = schema.validate(data, {
    abortEarly: false,
  })

  if (error) {
    logger.warn(error, 'Create user validation fail')

    throw new AppError(error.details, 400)
  }

  return value
}

export { validateCreateUser }
