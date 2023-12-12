import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create a question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository(),
      sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('it should be able to create a question', async () => {
    const {answer} = await sut.execute({
      instructorId: '1',
      questionId: '2',
      content: 'Qual e o melhor pais para se viver?'
    })
    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})