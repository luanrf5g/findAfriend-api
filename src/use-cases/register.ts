import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface RegisterUseCaseRequest {
  author: string
  email: string
  whatsapp: string
  password: string
  cep: string
  adress: string
  longitude: number
  latitude: number
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(public orgsRepository: OrgsRepository) {}

  async execute({
    author,
    email,
    password,
    whatsapp,
    cep,
    adress,
    latitude,
    longitude,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithTheSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithTheSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      author,
      email,
      password_hash,
      whatsapp,
      cep,
      adress,
      latitude,
      longitude,
    })

    return {
      org,
    }
  }
}
