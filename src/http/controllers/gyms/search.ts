import { makeSearchGymsService } from '@/services/factories/make-search-gyms-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchGymQuerrySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { q, page } = searchGymQuerrySchema.parse(req.query)

  const seachGymService = makeSearchGymsService()

  const { gyms } = await seachGymService.execute({ page, query: q })

  return res.status(200).send({
    gyms
  })
}
