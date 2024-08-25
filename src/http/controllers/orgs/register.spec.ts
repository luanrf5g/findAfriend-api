import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Register E2E Test', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a org', async () => {
    const response = await request(app.server).post('/orgs').send({
      author: 'Antonio Bandeira',
      email: 'nome@example.com',
      password: '123456',
      whatsapp: 81992961037,
      cep: 55016300,
      adress: 'Rua Texas, 119',
      city: 'Caruaru',
      state: 'PE',
      latitude: -30.24,
      longitude: -8.235,
    })

    expect(response.statusCode).toEqual(201)
  })
})
