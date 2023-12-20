import { AnswerComment } from "@/domain/enterprise/entities/answer-comment"
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository"

interface FetchAnswersUseCaseRequest {
  answerCommentsId: string
  page: number
}

interface FetchQuestionAnswersUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(
    private answerCommentssRepository: AnswerCommentsRepository) {
  }

  async execute({ answerCommentsId, page }: FetchAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answerComments = await this.answerCommentssRepository.findManByAnswerId(answerCommentsId, { page })

    return { answerComments }
  }
}