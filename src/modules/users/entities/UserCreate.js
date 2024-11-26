import { randomUUID } from 'crypto'
import { USERS_STATUS } from '../constants/users.js'

class UserCreateEntity {
  constructor({
    id,
    name,
    email,
    password,
    status,
  }) {
    const now = new Date().toISOString()

    this.id = id || randomUUID()
    this.name = name
    this.email = email
    this.password = password
    this.status = status || USERS_STATUS.ACTIVE

    this.created_at = now
    this.updated_at = now
  }
}

export {
  UserCreateEntity,
}
