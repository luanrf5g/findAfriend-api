import request from 'supertest'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'

import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateAOrg(
  app: FastifyInstance,
  city = 'Caruaru',
) {
  const randomEmail = randomUUID()

  const email = randomEmail + '@example.com'

  await prisma.org.create({
    data: {
      author: 'Antonio bandeira',
      email,
      whatsapp: '81992961037',
      password_hash: await hash('123456', 6),
      cep: '55016300',
      adress: 'Rua Texas, 119',
      city,
      state: 'PE',
      latitude: -27.587,
      longitude: -10.597,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email,
    password: '123456',
  })

  const { token, org } = authResponse.body

  return {
    token,
    org,
  }
}
