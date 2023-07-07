import { userRepository } from '../../dataBase/repositories/exportRepository.js'

export async function updateUserUseCase({ company, cpf }) {
  await userRepository.updateUser({
    cpf,
    company,
  })
}
