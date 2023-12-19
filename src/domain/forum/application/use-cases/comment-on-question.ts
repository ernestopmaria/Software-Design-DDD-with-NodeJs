import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionsRepository } from "../repositories/questions-repository";
import { QuestionComment } from "@/domain/enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface CommentOnQuestionUseCaseRequest {
  questionId: string
  authorId: string
  content: string

}

interface CommentOnQuestionResponse {
  questionComment: QuestionComment
}


export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionsCommentsRepository: QuestionCommentsRepository,
  ) { }

  async execute({ questionId, authorId, content }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionResponse> {

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error("Question not found")
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      content: content,
      questionId: new UniqueEntityID(question.id.toString())
    })

    await this.questionsCommentsRepository.create(questionComment)
    return { questionComment }
  }
}