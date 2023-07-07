import { z } from 'zod'
import { createUserUseCase } from '../../../useCase/user/createUserUseCase.js'

export async function createUser(request, reply) {
  const needsInTheBody = z.object({
    name: z.string(),
    age: z.number(),
    company: z.string(),
    cpf: z.string(),
  })

  const { name, age, company, cpf } = needsInTheBody.parse(request.body)

  await createUserUseCase({
    name,
    age,
    company,
    cpf,
  })

  return reply.status(201).send()
}
