
import { QuestionsRepository } from '../repositories/questions-repository'
interface DeleteQuestionUseCaseRequest {
  authorId:string
  questionId: string
}

interface DeleteQuestionUseCaseResponse { }


export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({
    authorId,
    questionId
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw Error("Question not found")
    }


    if (authorId!== question.authorId.toString()) {
      throw Error("You are not allowed to delete this question")
    }

    await this.questionsRepository.delete(question)



    return {}
  }
}
