import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { getPetProfile } from './get-pet-profile'
import { searchPets } from './search-pets'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, create)
  app.get('/pets', searchPets)
  app.get('/pets/:petId', getPetProfile)
}
