import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  items: Org[] = []

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org: Org = {
      id: data.id ?? randomUUID(),
      author: data.author,
      email: data.email,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      cep: data.cep,
      adress: data.adress,
      longitude: new Prisma.Decimal(data.longitude.toString()),
      latitude: new Prisma.Decimal(data.latitude.toString()),
    }

    this.items.push(org)

    return org
  }
}
