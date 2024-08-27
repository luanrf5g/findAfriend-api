import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateAOrg } from '@/utils/tests/createAndAuthenticateAOrg'

describe('Get Pet Profile E2E Test', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet profile', async () => {
    const { org } = await createAndAuthenticateAOrg(app)

    const pet = await prisma.pet.create({
      data: {
        org_id: org.id,
        name: 'Levi',
        requirements: 'Muito carinho e amor',
        age: 'Filhote',
        size: 'Pequeno',
        energy: 'Média',
        ambient: 'Médio',
        dependency: 'Média',
      },
    })

    const response = await request(app.server).get(`/pets/${pet.id}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({ name: expect.any(String) }),
    )
  })
})
