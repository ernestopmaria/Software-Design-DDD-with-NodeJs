import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { EditAnswerUseCase } from "./edit-answer";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";
import { makeAnswerAttachments } from "test/factories/make-answer-attachment";


let inMemoryAnswerRepository: InMemoryAnswersRepository
let  inMemoryAnswerAttachmentsRepository : InMemoryAnswerAttachmentsRepository
let sut: EditAnswerUseCase

describe(' Edit answer', () => {

  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository= new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)

    sut = new EditAnswerUseCase(inMemoryAnswerRepository, inMemoryAnswerAttachmentsRepository)
  })


  it(' should be able to update a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
      content: 'Content-1'
    },
      new UniqueEntityID('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachments({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('1')
      }),
      makeAnswerAttachments({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('2')
      }),)

    await sut.execute({
      authorId: 'author-1',
       content: 'Content-1',
      answerId: 'answer-1',
      attachmentsIds:['1', '3']
    }
    )
    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
         content: 'Content-1',
    })
    expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') })
    ])  }
  )
  it('it should not be able to update a answer from another user', async () => {


    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1'),

    },
      new UniqueEntityID('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      content: 'Content-1',
      answerId: 'answer-1',
      attachmentsIds: []

    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
  

})