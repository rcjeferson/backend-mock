import logger from '../../../../shared/config/logger/index.js'
import { removeBearer } from '../../utils/removeBearer.js'
import { normalizeHeaders } from '../../utils/normalizeHeaders.js'
import { AppError } from '../../../../shared/config/errors/AppError.js'

const authPublic = async (request, response, next) => {
  try {
    const headers = normalizeHeaders(request.headers)
    const authorizationToken = headers['x-api-generic'] || ''
    const generic_token = process.env.GENERIC_TOKEN

    const token = removeBearer(authorizationToken)

    if (!authorizationToken) {
      logger.warn({
        message: 'Unauthorized',
        data: {
          headers: request.headers,
          route: request.route,
        },
      })
      throw new AppError('Unauthorized', 401)
    }

    if (authorizationToken && token !== generic_token) {
      logger.warn({
        message: 'Unauthorized',
        data: {
          headers: request.headers,
          route: request.route,
        },
      })
      throw new AppError('Unauthorized', 401)
    }

    return next()
  } catch (error) {
    const statusCode = error.statusCode || 500
    const errorMessage = error.message || 'Internal Server Error'

    return response.status(statusCode).json({
      error: { message: errorMessage },
    })
  }
}

export { authPublic }
