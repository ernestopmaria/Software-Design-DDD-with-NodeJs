
import { QuestionRepository } from '../repositories/question-repository'
interface DeleteQuestionUseCaseRequest {
  authorId:string
  questionId: string
}

interface DeleteQuestionUseCaseResponse { }


export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) { }

  async execute({
    authorId,
    questionId
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {

    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw Error("Question not found")
    }


    if (authorId!== question.authorId.toString()) {
      throw Error("You are not allowed to delete this question")
    }

    await this.questionRepository.delete(question)



    return {}
  }
}
