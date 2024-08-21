import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsByParamsRequest {
  city: string
  age?: string
  energy?: string
  size?: string
  dependency?: string
}

interface FetchPetsByParamsResponse {
  pets: Pet[]
}

export class FetchPetsByParams {
  constructor(public petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    energy,
    size,
    dependency,
  }: FetchPetsByParamsRequest): Promise<FetchPetsByParamsResponse> {
    const pets = await this.petsRepository.findByParams({
      city,
      age,
      energy,
      size,
      dependency,
    })

    return { pets }
  }
}
