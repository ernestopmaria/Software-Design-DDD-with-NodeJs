import { AnswerCommentsRepository } from "../repositories/answer-comments-repository"

interface DeleteAnswerCommentUseCaseRequest {
  authorId:string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {}


export class DeleteAnswerCommentUseCase {
  constructor(private answercommentRepository: AnswerCommentsRepository) { }

  async execute({
    authorId,
    answerCommentId
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {

    const answerComment = await this.answercommentRepository.findById(answerCommentId)

    if (!answerComment) {
      throw Error("Answer comment not found")
    }


    if (authorId!== answerComment.authorId.toString()) {
      throw Error("You are not allowed to delete this answer comment")
    }

    await this.answercommentRepository.delete(answerComment)
    return {}
  }
}
