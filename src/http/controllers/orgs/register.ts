import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisteUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const orgCreateBodySchema = z.object({
    author: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.coerce.string(),
    cep: z.coerce.string(),
    adress: z.string(),
    city: z.string(),
    state: z.string(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })

  const {
    author,
    email,
    password,
    whatsapp,
    cep,
    adress,
    city,
    state,
    latitude,
    longitude,
  } = orgCreateBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisteUseCase()

    await registerUseCase.execute({
      author,
      email,
      password,
      whatsapp,
      cep,
      adress,
      city,
      state,
      latitude,
      longitude,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
