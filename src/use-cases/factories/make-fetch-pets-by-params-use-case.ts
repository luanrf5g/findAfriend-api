import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByParams } from '../fetch-pets-by-params'

export function makeFetchPetsByParamsUseCase() {
  const petsReposirtory = new PrismaPetsRepository()
  const fetchPetsByParamsUseCase = new FetchPetsByParams(petsReposirtory)

  return fetchPetsByParamsUseCase
}
