import request from 'supertest'
import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able create gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server).post('/gyms/create').set('Authorization', `Bearer ${token}`).send({
      title: 'JS Gym',
      description: 'some',
      phone: '1555154523385',
      latitude: -11.4449062,
      longitude: -61.4552218,
    })

    expect(response.statusCode).toEqual(201)
  })
})