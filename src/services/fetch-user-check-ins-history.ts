import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUserCheckInsServiceRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsServiceResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsServiceRequest): Promise<FetchUserCheckInsServiceResponse> {
    // calculate distance between user and gym

    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
