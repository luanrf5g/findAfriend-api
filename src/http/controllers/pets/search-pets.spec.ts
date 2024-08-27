import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAPet } from '@/utils/tests/createAPet'
import { createAndAuthenticateAOrg } from '@/utils/tests/createAndAuthenticateAOrg'

describe('Search Pets E2E Test', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to search pets by city', async () => {
    const { org, token } = await createAndAuthenticateAOrg(app, 'Caruaru')
    const { org: org1, token: token1 } = await createAndAuthenticateAOrg(
      app,
      'Maceió',
    )
    await createAPet({ app, token }, org)
    await createAPet({ app, token: token1 }, org1)

    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'Caruaru' })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('shouldnt be able to search pets without city', async () => {
    const response = await request(app.server).get('/pets')

    expect(response.statusCode).toEqual(400)
  })

  it('should be able to search pets with city and age', async () => {
    const { org, token } = await createAndAuthenticateAOrg(app, 'Caruaru')
    await createAPet({ app, token, age: 'big' }, org)
    await createAPet({ app, token, age: 'short' }, org)

    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'Caruaru', age: 'big' })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets with city and size', async () => {
    const { org, token } = await createAndAuthenticateAOrg(app, 'Caruaru')
    await createAPet({ app, token, size: 'small' }, org)
    await createAPet({ app, token, size: 'medium' }, org)
    await createAPet({ app, token, size: 'large' }, org)

    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'Caruaru', size: 'large' })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to seach pets with city and energy', async () => {
    const { org, token } = await createAndAuthenticateAOrg(app, 'Caruaru')
    await createAPet({ app, token, energy: 'small' }, org)
    await createAPet({ app, token, energy: 'medium' }, org)
    await createAPet({ app, token, energy: 'large' }, org)

    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'Caruaru', energy: 'small' })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets with city and dependency', async () => {
    const { org, token } = await createAndAuthenticateAOrg(app, 'Caruaru')
    await createAPet({ app, token, dependency: 'small' }, org)
    await createAPet({ app, token, dependency: 'medium' }, org)
    await createAPet({ app, token, dependency: 'large' }, org)

    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'Caruaru', dependency: 'large' })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })
})
