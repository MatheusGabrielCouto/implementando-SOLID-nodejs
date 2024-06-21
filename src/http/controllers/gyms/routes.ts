import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { create } from './create'
import { nearby } from './nearby'
import { verifyUserRole } from '@/http/middlewares/verifyUserRole'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms/create', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
