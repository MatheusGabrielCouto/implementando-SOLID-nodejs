import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsService } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsService // SUT - Sistem under Test

describe('Fetch Nearby Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()

    sut = new FetchNearbyGymsService(gymsRepository)
  })

  it('shoud be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      phone: null,
      description: null,
      latitude: -11.4449062,
      longitude: -61.4552218,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      phone: null,
      description: null,
      latitude: -11.7255182,
      longitude: -61.7761734,
    })

    const { gyms } = await sut.execute({
      userLatitude: -11.4449062,
      userLongitude: -61.4552218,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
