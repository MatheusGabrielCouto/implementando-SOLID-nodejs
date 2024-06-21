import { makeFechNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function nearby(req: FastifyRequest, res: FastifyReply) {
  const nearbyGymSchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymSchema.parse(req.query)

  const fechNearbyGymService = makeFechNearbyGymsService()

  const { gyms } = await fechNearbyGymService.execute({ userLatitude: latitude, userLongitude: longitude })

  return res.status(200).send({
    gyms
  })
}
