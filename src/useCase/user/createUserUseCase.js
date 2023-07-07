import { userRepository } from '../../dataBase/repositories/exportRepository.js'

export async function createUserUseCase({ name, age, company, cpf }) {
  await userRepository.createUser({
    name,
    age,
    company,
    cpf,
  })
}
