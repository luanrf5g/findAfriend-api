import { describe, beforeEach, it, expect } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { CreatePetUseCase } from './create-pet'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a pet', async () => {
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
      latitude: -27.587,
      longitude: -10.597,
    })

    const { pet } = await sut.execute({
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

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet without a org', async () => {
    await expect(() =>
      sut.execute({
        name: 'Levi',
        description: 'Gato cinza muito carinhoso',
        requirements: 'Muito carinho e amor',
        age: 'Filhote',
        size: 'Pequeno',
        energy: 'Média',
        ambient: 'Médio',
        dependency: 'Média',
        org_id: 'org-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
