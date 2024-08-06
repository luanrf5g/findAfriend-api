import { FastifyInstance } from 'fastify'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/:orgId/pet', () => {})
  app.get('/pets', () => {})
  app.get('/pets/:petId', () => {})
}
