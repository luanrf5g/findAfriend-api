import { Prisma, Pet } from '@prisma/client'

import { PetsRepository, searchParams } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findByParams(params: searchParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        dependency: params.dependency,
        energy: params.energy,
        size: params.size,
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })

    return pet
  }
}
