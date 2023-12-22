import { QuestionComment } from "@/domain/enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { Either, right } from "@/core/either";

interface FetchQuestionAnswersUseCaseRequest {
  questionCommentId: string
  page: number
}

type FetchQuestionAnswersUseCaseResponse = Either<null, {
  questionComments: QuestionComment[]
}>

export class FetchQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentsRepository) {
  }

  async execute({ questionCommentId, page }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionCommentId, { page })

    return right({ questionComments })
  }
}