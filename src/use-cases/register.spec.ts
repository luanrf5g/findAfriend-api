import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
  it('should be able to register a org', async () => {
    const inMemoryOrgsRepository = new InMemoryOrgsRepository()
    const registerUseCase = new RegisterUseCase(inMemoryOrgsRepository)

    const { org } = await registerUseCase.execute({
      author: 'Antonio bandeira',
      email: 'nome@example.com',
      whatsapp: '81992961037',
      password: '123456',
      cep: '55016300',
      adress: 'Rua Texas, 119',
      latitude: -27.587,
      longitude: -10.597,
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
