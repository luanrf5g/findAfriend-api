import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register a org', async () => {
    const { org } = await sut.execute({
      author: 'Antonio bandeira',
      email: 'nome@example.com',
      whatsapp: '81992961037',
      password: '123456',
      cep: '55016300',
      adress: 'Rua Texas, 119',
      city: 'Caruaru',
      state: 'PE',
      latitude: -27.587,
      longitude: -10.597,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      author: 'Antonio bandeira',
      email: 'nome@example.com',
      whatsapp: '81992961037',
      password: '123456',
      cep: '55016300',
      adress: 'Rua Texas, 119',
      city: 'Caruaru',
      state: 'PE',
      latitude: -27.587,
      longitude: -10.597,
    })

    const isPasswordHashCorrectly = await compare('123456', org.password_hash)

    expect(isPasswordHashCorrectly).toBe(true)
  })

  it('should not be able to register with email twice', async () => {
    const email = 'nome@example.com'

    await sut.execute({
      author: 'Antonio bandeira',
      email,
      whatsapp: '81992961037',
      password: '123456',
      cep: '55016300',
      adress: 'Rua Texas, 119',
      city: 'Caruaru',
      state: 'PE',
      latitude: -27.587,
      longitude: -10.597,
    })

    await expect(() =>
      sut.execute({
        author: 'Antonio bandeira',
        email: 'nome@example.com',
        whatsapp: '81992961037',
        password: '123456',
        cep: '55016300',
        adress: 'Rua Texas, 119',
        city: 'Caruaru',
        state: 'PE',
        latitude: -27.587,
        longitude: -10.597,
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
