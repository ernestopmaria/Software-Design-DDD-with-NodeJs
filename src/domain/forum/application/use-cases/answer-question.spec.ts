import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create a question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository(),
      sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('it should be able to create a question', async () => {
   const result = await sut.execute({
      instructorId: '1',
      questionId: '2',
      content: 'Qual e o melhor pais para se viver?',
      attachmentsIds:['1', '2']
    })
    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0].id).toEqual(result.value?.answer.id)
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({attachmentId:new UniqueEntityID('1')}),
      expect.objectContaining({attachmentId:new UniqueEntityID('2')})
    ])
  })
})
