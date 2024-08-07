import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
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
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    data: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(data.password, 6)

    const orgWithTheSameEmail = await this.orgsRepository.findByEmail(
      data.email,
    )

    if (orgWithTheSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({ password_hash, ...data })

    return {
      org,
    }
  }
}
