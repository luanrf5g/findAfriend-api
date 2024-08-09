import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  create(data: Prisma.PetCreateInput): Promise<Pet> {
    throw new Error('Method not implemented.')
  }
}
