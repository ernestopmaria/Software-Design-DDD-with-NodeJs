import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CommentOnQuestionUseCaseRequest {
  questionId: string
  authorId: string
  content: string

}

type CommentOnQuestionResponse = Either<ResourceNotFoundError, {
  questionComment: QuestionComment
}>


export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionsCommentsRepository: QuestionCommentsRepository,
  ) { }

  async execute({ questionId, authorId, content }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionResponse> {

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      content: content,
      questionId: new UniqueEntityID(question.id.toString())
    })

    await this.questionsCommentsRepository.create(questionComment)
    return right({ questionComment })
  }
}