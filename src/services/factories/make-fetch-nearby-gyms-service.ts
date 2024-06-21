import { FetchNearbyGymsService } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFechNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository()

  const service = new FetchNearbyGymsService(gymsRepository)

  return service
}
