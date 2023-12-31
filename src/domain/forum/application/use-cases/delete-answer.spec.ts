import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { makeAnswerAttachments } from 'test/factories/make-answer-attachment'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: DeleteAnswerUseCase

describe('delete a answer by id', () => {
  beforeEach(async () => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository),
        sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })
  it('it should be able to delete a answer by id', async () => {

    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
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
      })
    )

    await sut.execute({ authorId: 'author-1', answerId: 'answer-1' })
    expect(inMemoryAnswerRepository.items).toHaveLength(0)
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0)
  })

  it('it should not be able to delete a answer from another user', async () => {

    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    },
      new UniqueEntityID('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)
const result = await sut.execute({
          authorId: 'author-2',
          answerId: 'answer-1'
        })
         
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
