import { QuestionCommentsRepository } from "../repositories/question-comments-repository"

interface DeleteQuestionCommentUseCaseRequest {
  authorId:string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {}


export class DeleteQuestionCommentUseCase {
  constructor(private questioncommentRepository: QuestionCommentsRepository) { }

  async execute({
    authorId,
    questionCommentId
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {

    const questionComment = await this.questioncommentRepository.findById(questionCommentId)

    if (!questionComment) {
      throw Error("Question comment not found")
    }


    if (authorId!== questionComment.authorId.toString()) {
      throw Error("You are not allowed to delete this question")
    }

    await this.questioncommentRepository.delete(questionComment)
    return {}
  }
}
