import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('delete a answer by id', () => {
  beforeEach(async () => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository(),
        sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })
  it('it should be able to delete a answer by id', async () => {

    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    },
      new UniqueEntityID('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({ authorId: 'author-1', answerId: 'answer-1' })
    expect(inMemoryAnswerRepository.items).toHaveLength(0)
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
