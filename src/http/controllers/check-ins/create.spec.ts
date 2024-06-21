import request from 'supertest'
import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able create check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const gym = await prisma.gym.create({
      data: {
        title: 'JS Gym',
        description: 'some',
        phone: '1555154523385',
        latitude: -11.4449062,
        longitude: -61.4552218,
      }
    })

    const response = await request(app.server).post(`/gyms/${gym.id}/check-ins`).set('Authorization', `Bearer ${token}`).send({
      latitude: -11.4449062,
      longitude: -61.4552218,
    })

    expect(response.statusCode).toEqual(201)
  })
})