import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create a question', () => {
  beforeEach(async () => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository(),
      sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })
  it('it should be able to create a question', async () => {
    const createQuestion = makeQuestion()
    const { question } = await sut.execute({
      title: 'Melhor pais',
      authorId: '1',
      content: 'Qual e o melhor pais para se viver?'
    })
    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id)
  })
})
