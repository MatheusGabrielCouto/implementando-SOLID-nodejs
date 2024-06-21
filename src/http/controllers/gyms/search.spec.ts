import request from 'supertest'
import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able search gym by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server).post('/gyms/create').set('Authorization', `Bearer ${token}`).send({
      title: 'JS Gym',
      description: 'some',
      phone: '1555154523385',
      latitude: -11.4449062,
      longitude: -61.4552218,
    })

    await request(app.server).post('/gyms/create').set('Authorization', `Bearer ${token}`).send({
      title: 'Ts Gym',
      description: 'some',
      phone: '1555154523385',
      latitude: -11.4449062,
      longitude: -61.4552218,
    })

    const response = await request(app.server).get('/gyms/search').query({
      q: 'JS'
    }).set('Authorization', `Bearer ${token}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JS Gym'
      })
    ])
  })
})