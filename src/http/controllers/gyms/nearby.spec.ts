import request from 'supertest'
import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able search gym by nearby', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server).post('/gyms/create').set('Authorization', `Bearer ${token}`).send({
      title: 'Near Gym',
      phone: null,
      description: null,
      latitude: -11.4449062,
      longitude: -61.4552218,
    })

    await request(app.server).post('/gyms/create').set('Authorization', `Bearer ${token}`).send({
      title: 'Far Gym',
      phone: null,
      description: null,
      latitude: -11.7255182,
      longitude: -61.7761734,
    })

    const response = await request(app.server).get('/gyms/nearby').query({
      latitude: -11.4449062,
      longitude: -61.4552218,
    }).set('Authorization', `Bearer ${token}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym'
      })
    ])
  })
})