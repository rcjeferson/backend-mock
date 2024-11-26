import logger from '../../../../shared/config/logger/index.js'
import { ExpressAPI } from '../../../../shared/config/wrappers/ExpressAPIWrapper.js'
import parseRequest from '../../../../shared/utils/parseRequest.js'
import { UserUseCase } from '../../use-case/UserUseCase.js'

const listUsers = async (request, _response) => {
  const { query_parameters } = parseRequest(request)

  logger.info({
    message: 'Request list users',
    data: {
      query_parameters,
    },
  })

  const userUseCase = new UserUseCase()
  const users = await userUseCase.listUsers()

  logger.info({
    message: 'Finished request list users',
  })

  return { users }
}

const expressAPI = new ExpressAPI()
const listUsersController = expressAPI.wrapper(listUsers)

export { listUsersController }
