import logger from '../../../shared/config/logger/index.js'
import { AppError } from '../../../shared/config/errors/AppError.js'
import { UserCreateEntity } from '../entities/UserCreate.js'
import { UserBasicResponse } from '../entities/UserResponseBasic.js'
import { UserRepository } from '../repositories/UserRepository.js'

class UserUseCase {
  async create(user_create) {
    const user = new UserCreateEntity(user_create)
    const userRepository = new UserRepository()

    const userTable = await userRepository.findByEmail(user.email)
    if (userTable) {
      logger.warn({
        message: 'User already exists',
        email: user.email,
      })

      throw new AppError('User already exists', 409)
    }

    const userCreated = await userRepository.create(user)

    return userCreated
  }

  async listUsers() {
    const userRepository = new UserRepository()
    const users = await userRepository.listUsers()

    return users.map((user) => new UserBasicResponse(user))
  }

  async deleteUser(id) {
    const userRepository = new UserRepository()

    const user = await userRepository.findById(id)
    if (!user) {
      logger.warn({
        message: 'User not found to delete',
        user_id: id,
      })

      throw new AppError('User not found', 404)
    }

    await userRepository.delete(id)
  }
}

export {
  UserUseCase,
}
