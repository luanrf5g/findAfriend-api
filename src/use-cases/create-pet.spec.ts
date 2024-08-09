import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { CreatePetUseCase } from './create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
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
})
