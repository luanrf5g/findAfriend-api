import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, Prisma } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

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
  constructor(
    public petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute(
    data: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(data.org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

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
