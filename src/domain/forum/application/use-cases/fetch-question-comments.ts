import { QuestionComment } from "@/domain/enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface FetchQuestionAnswersUseCaseRequest {
  questionCommentId: string
  page: number
}

interface FetchQuestionAnswersUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentsRepository) {
  }

  async execute({ questionCommentId, page }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionCommentId, {page})
    
    return { questionComments }
  }
}