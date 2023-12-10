import { QuestionRepository } from '../repositories/question-repository'
import { Question } from '@/domain/enterprise/entities/question'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionRepository = {
  create: async (question: Question) => {},
}

test('create an question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)
  const { question } = await createQuestion.execute({
    title: 'Melhor pais',
    authorId: '1',
    content: 'Qual e o melhor pais para se viver?',
  })
  expect(question.id).toBeTruthy()
})
