import { makeCheckInService } from '@/services/factories/make-check-in-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid()
  })
  const createCheckInBodySchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(req.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(req.body)

  const createCheckIn = makeCheckInService()

  await createCheckIn.execute({
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
    userId: req.user.sub
  })

  return res.status(201).send()
}
