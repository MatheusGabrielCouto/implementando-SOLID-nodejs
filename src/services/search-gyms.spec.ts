import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsService } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsService // SUT - Sistem under Test

describe('Search Services', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()

    sut = new SearchGymsService(gymsRepository)
  })

  it('shoud be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Js Gym',
      phone: null,
      description: null,
      latitude: -11.4449062,
      longitude: -61.4552218,
    })

    await gymsRepository.create({
      title: 'Ts Gym',
      phone: null,
      description: null,
      latitude: -11.4449062,
      longitude: -61.4552218,
    })

    const { gyms } = await sut.execute({
      query: 'Ts Gym',
      page: 1,
    })

    expect(gyms).toEqual([expect.objectContaining({ title: 'Ts Gym' })])
  })

  it('shoud be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Ts Gym ${i}`,
        phone: null,
        description: null,
        latitude: -11.4449062,
        longitude: -61.4552218,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Ts Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Ts Gym 21' }),
      expect.objectContaining({ title: 'Ts Gym 22' }),
    ])
  })
})
