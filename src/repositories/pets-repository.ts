import { Pet, Prisma } from '@prisma/client'

export interface searchParams {
  city: string
  age?: string
  energy?: string
  size?: string
  dependency?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByParams(params: searchParams): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
