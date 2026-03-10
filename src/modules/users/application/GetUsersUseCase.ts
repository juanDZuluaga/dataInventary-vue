import type { User } from '../domain/User'
import type { UserRepository } from '../domain/UserRepository'

export class GetUsersUseCase {

  private readonly userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute(): Promise<User[]> {
    return this.userRepository.findAll()
  }
}