import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterUseCase } from '../register'

export function makeRegisteUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const registerUseCase = new RegisterUseCase(orgsRepository)

  return registerUseCase
}
