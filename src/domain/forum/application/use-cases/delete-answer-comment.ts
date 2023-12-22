import { left, right, Either } from "@/core/either"
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { NotAllowedError } from "./errors/not-allowed-error"

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>


export class DeleteAnswerCommentUseCase {
  constructor(private answercommentRepository: AnswerCommentsRepository) { }

  async execute({
    authorId,
    answerCommentId
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {

    const answerComment = await this.answercommentRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answerComment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answercommentRepository.delete(answerComment)
    return right({})
  }
}
