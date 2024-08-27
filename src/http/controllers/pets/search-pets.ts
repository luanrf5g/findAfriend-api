import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchPetsByParamsUseCase } from '@/use-cases/factories/make-fetch-pets-by-params-use-case'

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    energy: z.string().optional(),
    size: z.string().optional(),
    dependency: z.string().optional(),
  })

  const { city, age, energy, size, dependency } = searchPetsQuerySchema.parse(
    request.query,
  )

  const fetchPetsByParams = makeFetchPetsByParamsUseCase()

  try {
    const { pets } = await fetchPetsByParams.execute({
      city,
      age,
      energy,
      size,
      dependency,
    })

    return reply.status(200).send({ pets })
  } catch (err) {
    return reply.status(404).send({ message: 'Resource Not Found.' })
  }
}
