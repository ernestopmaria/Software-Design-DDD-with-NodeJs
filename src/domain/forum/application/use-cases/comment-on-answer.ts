import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswersRepository } from "../repositories/answers-repository";
import { AnswerComment } from "@/domain/enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface CommentOnAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string

}

interface CommentOnAnswerResponse {
  answerComment: AnswerComment
}


export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answersCommentsRepository: AnswerCommentsRepository,
  ) { }

  async execute({ answerId, authorId, content }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerResponse> {

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error("Answer not found")
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      content: content,
      answerId: new UniqueEntityID(answer.id.toString())
    })

    await this.answersCommentsRepository.create(answerComment)
    return { answerComment }
  }
}