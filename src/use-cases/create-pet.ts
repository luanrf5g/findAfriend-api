import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, Prisma } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  description?: string
  requirements?: string
  age: string
  size: string
  energy: string
  dependency: string
  ambient: string
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(public petsRepository: PetsRepository) {}

  async execute(
    data: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name: data.name,
      description: data.description,
      requirements: data.requirements,
      age: data.age,
      size: data.size,
      energy: data.energy,
      ambient: data.ambient,
      dependency: data.dependency,
      org_id: data.org_id,
    })

    return { pet }
  }
}
