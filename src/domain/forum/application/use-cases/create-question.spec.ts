import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create a question', () => {
  beforeEach(async () => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository(),
      sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })
  it('it should be able to create a question', async () => {
 
    const result = await sut.execute({
      title: 'Melhor pais',
      authorId: '1',
      content: 'Qual e o melhor pais para se viver?',
      attachmentsIds:['1', '2']
    })
    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question)
    expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({attachmentId:new UniqueEntityID('1')}),
      expect.objectContaining({attachmentId:new UniqueEntityID('2')})
    ])
  })
})
