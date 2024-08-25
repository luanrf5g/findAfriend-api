import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetProfileUseCase } from './get-pet-profile'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetProfileUseCase

describe('Get Pet Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetProfileUseCase(petsRepository)
  })

  it('should be able to get a pet profile', async () => {
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

    const createdPet = await petsRepository.create({
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

    const { pet } = await sut.execute({
      id: createdPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('shouldnt be able to get a pet profile with a inexists id', async () => {
    expect(() =>
      sut.execute({
        id: 'inexistent-pet-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
