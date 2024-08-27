import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Refresh (E2E)', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/orgs').send({
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'nome@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    if (cookies === undefined) {
      throw new Error()
    }

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
