import { left, right, Either } from "@/core/either"
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository"

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<string,{} >


export class DeleteAnswerCommentUseCase {
  constructor(private answercommentRepository: AnswerCommentsRepository) { }

  async execute({
    authorId,
    answerCommentId
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {

    const answerComment = await this.answercommentRepository.findById(answerCommentId)

    if (!answerComment) {
      return left("Answer comment not found")
    }

    if (authorId !== answerComment.authorId.toString()) {
      return left('Not allowed')
    }

    await this.answercommentRepository.delete(answerComment)
    return right({})
  }
}
