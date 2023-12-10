import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '@/domain/enterprise/entities/answer'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

interface CreateAnswerUseCaseResponse {
  answer: Answer
}


export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswersRepository){}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest):Promise<CreateAnswerUseCaseResponse>  {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })
    await this.answerRepository.create(answer)

    return {answer}
  }
}
