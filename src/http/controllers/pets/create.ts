import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    requirements: z.string(),
    age: z.string(),
    size: z.string(),
    energy: z.string(),
    dependency: z.string(),
    ambient: z.string(),
  })

  const {
    name,
    description,
    requirements,
    age,
    size,
    energy,
    dependency,
    ambient,
  } = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  const { pet } = await createPetUseCase.execute({
    org_id: request.user.sub,
    name,
    description,
    requirements,
    age,
    size,
    energy,
    dependency,
    ambient,
  })

  return reply.status(201).send({ pet })
}
