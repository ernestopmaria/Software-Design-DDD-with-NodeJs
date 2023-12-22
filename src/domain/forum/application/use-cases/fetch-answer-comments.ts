import { AnswerComment } from "@/domain/enterprise/entities/answer-comment"
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository"
import { Either, right } from "@/core/either"

interface FetchAnswersUseCaseRequest {
  answerCommentsId: string
  page: number
}

type FetchQuestionAnswersUseCaseResponse = Either<null, {
  answerComments: AnswerComment[]
}>

export class FetchAnswerCommentsUseCase {
  constructor(
    private answerCommentssRepository: AnswerCommentsRepository) {
  }

  async execute({ answerCommentsId, page }: FetchAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answerComments = await this.answerCommentssRepository.findManByAnswerId(answerCommentsId, { page })

    return right({ answerComments })
  }
}