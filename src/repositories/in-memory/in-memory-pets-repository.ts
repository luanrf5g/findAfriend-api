import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  items: Pet[] = []

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
