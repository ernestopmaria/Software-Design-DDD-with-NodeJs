import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswersRepository } from "../repositories/answers-repository";
import { AnswerComment } from "@/domain/enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CommentOnAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string

}

type CommentOnAnswerResponse = Either<ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answersCommentsRepository: AnswerCommentsRepository,
  ) { }

  async execute({ answerId, authorId, content }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerResponse> {

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      content: content,
      answerId: new UniqueEntityID(answer.id.toString())
    })

    await this.answersCommentsRepository.create(answerComment)
    return right({ answerComment })
  }
}