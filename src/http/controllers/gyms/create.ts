import { makeCreateGymService } from '@/services/factories/make-create-gym-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { emitWarning } from 'process'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const { description, latitude, longitude, phone, title } = createGymBodySchema.parse(req.body)

  console.log(req.body)

  const createGym = makeCreateGymService()

  await createGym.execute({
    description,
    latitude,
    longitude,
    phone,
    title
  })

  return res.status(201).send()
}
