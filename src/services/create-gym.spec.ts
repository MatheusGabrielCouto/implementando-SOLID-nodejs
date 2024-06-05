import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymService } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

describe('Create Gyn Service', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: CreateGymService // SUT - Sistem under Test

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('shoud be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Js gym',
      phone: null,
      description: null,
      latitude: -11.4449062,
      longitude: -61.4552218,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
