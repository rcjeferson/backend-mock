import logger from '../../../../shared/config/logger/index.js'
import { ExpressAPI } from '../../../../shared/config/wrappers/ExpressAPIWrapper.js'
import parseRequest from '../../../../shared/utils/parseRequest.js'
import { UserUseCase } from '../../use-case/UserUseCase.js'

const deleteUser = async (request, _response) => {
  const { path_parameters } = parseRequest(request)

  logger.info({
    message: 'Request delete user',
    data: {
      user_id: path_parameters.id,
    },
  })

  const userUseCase = new UserUseCase()
  const user = await userUseCase.deleteUser(path_parameters.id)

  logger.info({
    message: 'Finished request delete user',
    data: {
      user_id: path_parameters.id,
    },
  })

  return user
}

const expressAPI = new ExpressAPI()
const deleteUserController = expressAPI.wrapper(deleteUser)

export { deleteUserController }
