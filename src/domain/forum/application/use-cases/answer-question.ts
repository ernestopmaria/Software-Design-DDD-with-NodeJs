import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Either, right } from '@/core/either'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answer-attachment-list'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
  attachmentsIds: string[]
}

type CreateAnswerUseCaseResponse = Either<null, {
  answer: Answer
}
>

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswersRepository) { }
  
  async execute({
    instructorId,
    questionId,
    content,
    attachmentsIds
  }: AnswerQuestionUseCaseRequest): Promise<CreateAnswerUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    const answerAttachments = attachmentsIds.map((attachmentId => {
      return AnswerAttachment.create({ attachmentId: new UniqueEntityID(attachmentId), answerId: answer.id })
    }))

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answerRepository.create(answer)

    return right({ answer })
  }
}
