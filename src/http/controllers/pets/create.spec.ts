import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateAOrg } from '@/utils/tests/createAndAuthenticateAOrg'

describe('Create Pet E2E Pest', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token, org } = await createAndAuthenticateAOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        org_id: org.id,
        name: 'Levi',
        description: 'Gato cinza muito carinhoso',
        requirements: 'Muito carinho e amor',
        age: 'Filhote',
        size: 'Pequeno',
        energy: 'Média',
        ambient: 'Médio',
        dependency: 'Média',
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.pet).toEqual(
      expect.objectContaining({ id: expect.any(String) }),
    )
  })
})
