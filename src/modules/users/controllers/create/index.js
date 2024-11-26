import logger from '../../../../shared/config/logger/index.js'
import { ExpressAPI } from '../../../../shared/config/wrappers/ExpressAPIWrapper.js'
import parseRequest from '../../../../shared/utils/parseRequest.js'
import { UserBasicResponse } from '../../entities/UserResponseBasic.js'
import { validateCreateUser } from './validate.js'
import { UserUseCase } from '../../use-case/UserUseCase.js'

const createUser = async (request, _response) => {
  const { body } = parseRequest(request)
  logger.info({
    message: 'Request create user',
    data: {
      ...body,
    },
  })

  const userToCreate = validateCreateUser(body)

  const userUseCase = new UserUseCase()

  const userCreated = await userUseCase.create({
    ...userToCreate,
  })

  const userBasicResponse = new UserBasicResponse(userCreated)

  logger.info({
    message: 'Finished request create user',
  })

  return userBasicResponse
}

const expressAPI = new ExpressAPI()
const createUserController = expressAPI.wrapper(createUser)

export { createUserController }
