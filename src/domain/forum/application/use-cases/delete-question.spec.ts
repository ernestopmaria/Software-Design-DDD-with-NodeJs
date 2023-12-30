import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { makeQuestionAttachments } from 'test/factories/make-question-attachment'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let createQuestionUseCase: CreateQuestionUseCase
let sut: DeleteQuestionUseCase

describe('delete a question', () => {
  beforeEach(async () => {
   
      inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
      inMemoryQuestionRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentsRepository),
    createQuestionUseCase = new CreateQuestionUseCase(inMemoryQuestionRepository)
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
  })
  it('it should be able to delete a question', async () => {

    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    },
      new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)


    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachments({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('1')
      }),
      makeQuestionAttachments({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('2')
      })
    )

    await sut.execute({ authorId: 'author-1', questionId: 'question-1' })
    expect(inMemoryQuestionRepository.items).toHaveLength(0)
    expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(0)
  })

  it('it should not be able to delete a question from another user', async () => {

    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    },
      new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: 'question-1'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
