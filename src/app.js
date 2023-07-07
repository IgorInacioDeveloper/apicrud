import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env/index.js'
import { userRoutes } from './http/controllers/user/routes.js'
import { companyRoutes } from './http/controllers/company/routes.js'

export const app = fastify()

app.register(userRoutes)
app.register(companyRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Zod validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
})
