import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetProfileUseCase } from '../get-pet-profile'

export function makeGetPetProfileUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getPetProfileUseCase = new GetPetProfileUseCase(petsRepository)

  return getPetProfileUseCase
}
