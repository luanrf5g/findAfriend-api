import { makeGetPetProfileUseCase } from '@/use-cases/factories/make-get-pet-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetProfileParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = getPetProfileParamsSchema.parse(request.params)

  const getPetProfile = makeGetPetProfileUseCase()

  const { pet } = await getPetProfile.execute({ id: petId })

  return reply.status(200).send({ pet })
}
