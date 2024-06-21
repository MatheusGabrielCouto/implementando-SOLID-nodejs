import { makeFechUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function history(req: FastifyRequest, res: FastifyReply) {
  const checkInHistoryQuerrySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  })

  const { page } = checkInHistoryQuerrySchema.parse(req.query)

  const fetchCheckInUserHistory = makeFechUserCheckInsHistoryService()

  const { checkIns } = await fetchCheckInUserHistory.execute({ page, userId: req.user.sub })

  return res.status(200).send({
    checkIns
  })
}
