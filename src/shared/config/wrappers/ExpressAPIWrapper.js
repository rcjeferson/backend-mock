import logger from '../logger/index.js'
import { isNullOrEmpty } from '../../utils/isNullEmpty.js'

class ExpressAPI {
  wrapper(handler) {
    return async (request, response) => {
      try {
        const result = await handler(request, response)
        const statusCode = (isNullOrEmpty(result) && !Array.isArray(result))
          ? 204
          : 200

        return response.status(statusCode).json(result)
      } catch (error) {
        if (error.isExpected) {
          const { statusCode, body } = error
          return response.status(statusCode).json(body)
        }
        logger.error(error, 'Unexpected API Error')

        return response.status(500).json()
      }
    }
  }
}

export { ExpressAPI }
