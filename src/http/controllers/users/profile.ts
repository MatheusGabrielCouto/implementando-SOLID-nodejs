import { makeGetUserProficeService } from '@/services/factories/make-get-user-profile-service'
import { FastifyRequest, FastifyReply } from 'fastify'


export async function profile(req: FastifyRequest, res: FastifyReply) {

  const getUserProfile = makeGetUserProficeService()

  const { user } = await getUserProfile.execute({
    userId: req.user.sub
  })

  return res.status(200).send({
    user: {
      ...user,
      password_hash: undefined
    }
  })
}
