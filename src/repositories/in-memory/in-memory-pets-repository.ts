import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { InMemoryOrgsRepository } from './in-memory-orgs-repository'
import { PetsRepository, searchParams } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findByParams(params: searchParams): Promise<Pet[]> {
    const orgs = this.orgsRepository.items.filter(
      (item) => item.city === params.city,
    )

    const pets = this.items
      .filter((item) => orgs.some((org) => org.id === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) => (params.energy ? item.energy === params.energy : true))
      .filter((item) =>
        params.dependency ? item.dependency === params.dependency : true,
      )

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description ? data.description : null,
      requirements: data.requirements ? data.requirements : null,
      age: data.age,
      size: data.size,
      energy: data.energy,
      dependency: data.dependency,
      ambient: data.ambient,
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }
}
