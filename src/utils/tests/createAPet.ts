import request from 'supertest'
import { Org } from '@prisma/client'
import { FastifyInstance } from 'fastify'

interface createAPetProps {
  app: FastifyInstance
  token: string
  age?: string
  size?: string
  energy?: string
  dependency?: string
}

export async function createAPet(
  {
    app,
    token,
    age = 'medium',
    size = 'small',
    energy = 'medium',
    dependency = 'medium',
  }: createAPetProps,
  org: Org,
) {
  const response = await request(app.server)
    .post('/pets')
    .set('Authorization', `Bearer ${token}`)
    .send({
      org_id: org.id,
      name: 'Levi',
      description: 'Gato cinza muito carinhoso',
      requirements: 'Muito carinho e amor',
      ambient: 'medium',
      age,
      size,
      energy,
      dependency,
    })

  const { pet } = response.body

  return {
    pet,
  }
}
