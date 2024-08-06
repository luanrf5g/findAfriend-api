import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const prisma = new PrismaClient()

  const orgCreateBodySchema = z.object({
    author: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.coerce.string(),
    cep: z.coerce.string(),
    adress: z.string(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })

  const {
    author,
    email,
    password,
    whatsapp,
    cep,
    adress,
    latitude,
    longitude,
  } = orgCreateBodySchema.parse(request.body)

  const password_hash = await hash(password, 6)

  try {
    const org = await prisma.org.create({
      data: {
        author,
        email,
        password_hash,
        whatsapp,
        cep,
        adress,
        latitude,
        longitude,
      },
    })
  } catch (err) {
    throw new Error('Cannot create a org')
  }

  return reply.status(201).send()
}
