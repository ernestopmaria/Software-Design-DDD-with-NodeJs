import { Answer } from "@/domain/forum/enterprise/entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"
import { Either, left, right } from "@/core/either"
import { NotAllowedError } from "./errors/not-allowed-error"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { AnswerAttachmentsRepository } from "../repositories/answer-attachments-repository "
import { AnswerAttachmentList } from "@/domain/forum/enterprise/entities/answer-attachment-list"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment"


interface EditAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, {
  answer: Answer
}>

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository) { }

  async execute({ authorId, content, answerId, attachmentsIds }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }
    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachments,)

    const answerAttachments = attachmentsIds.map((attachmentId => {
      return AnswerAttachment.create({ attachmentId: new UniqueEntityID(attachmentId), answerId: answer.id })
    }))

    answerAttachmentList.update(answerAttachments)


    answer.attachments = answerAttachmentList
    answer.content = content
    
    await this.answersRepository.save(answer)

    return right({ answer })
  }

}