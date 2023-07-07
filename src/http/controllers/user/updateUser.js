import { z } from 'zod'
import { updateUserUseCase } from '../../../useCase/user/updateUserUseCase.js'

export async function updateUser(request, reply) {
  const needsInTheBody = z.object({
    cpf: z.string(),
    company: z.string(),
  })

  const { company, cpf } = needsInTheBody.parse(request.body)

  await updateUserUseCase({
    company,
    cpf,
  })

  return reply.status(201).send()
}
