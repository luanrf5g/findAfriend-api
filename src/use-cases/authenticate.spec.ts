import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { AuthenticateUseCase } from './authenticate'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate a org', async () => {
    await orgsRepository.create({
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

    const { org } = await sut.execute({
      email: 'nome@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'nome@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
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

    await expect(() =>
      sut.execute({
        email: 'nome@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
