import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateAOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
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
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'nome@example.com',
    password: '123456',
  })

  const { token, orgId } = authResponse.body

  return {
    token,
    orgId,
  }
}
