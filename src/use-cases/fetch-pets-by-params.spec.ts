import { beforeEach, describe, expect, it } from 'vitest'
import { Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FetchPetsByParams } from './fetch-pets-by-params'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByParams

describe('Fetch Pets By Params', async () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new FetchPetsByParams(petsRepository)
  })

  it('should be able to search pets by the city', async () => {
    orgsRepository.create({
      id: 'org-01',
      author: 'Antonio bandeira',
      email: 'nome@example.com',
      whatsapp: '81992961037',
      password_hash: await hash('123456', 6),
      cep: '55016300',
      adress: 'Rua Texas, 119',
      city: 'Caruaru',
      state: 'PE',
      latitude: new Prisma.Decimal(-27.587),
      longitude: new Prisma.Decimal(-10.597),
    })

    petsRepository.create({
      name: 'Levi',
      description: 'Gato cinza muito carinhoso',
      requirements: 'Muito carinho e amor',
      age: 'Filhote',
      size: 'Pequeno',
      energy: 'Média',
      ambient: 'Médio',
      dependency: 'Média',
      org_id: 'org-01',
    })

    petsRepository.create({
      name: 'Leckter',
      description: 'Gato cor diferenciada',
      requirements: 'Muito carinho e amor',
      age: 'Filhote',
      size: 'Pequeno',
      energy: 'Alta',
      ambient: 'Médio',
      dependency: 'Baixo',
      org_id: 'org-01',
    })

    const { pets } = await sut.execute({
      city: 'Caruaru',
    })

    expect(pets).toHaveLength(2)
  })
})
