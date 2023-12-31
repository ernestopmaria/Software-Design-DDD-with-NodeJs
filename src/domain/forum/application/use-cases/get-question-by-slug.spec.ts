import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '@/domain/enterprise/entities/value-objects/slug'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionAttachmentsRepository : InMemoryQuestionAttachmentsRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let createQuestionUseCase: CreateQuestionUseCase
let sut: GetQuestionBySlugUseCase

describe('get a question by slug', () => {
  beforeEach(async () => {

 inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentsRepository),
      createQuestionUseCase = new CreateQuestionUseCase(inMemoryQuestionRepository)
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('it should be able to get a question by slug', async () => {

    const newQuestion =makeQuestion({
      slug: Slug.create('melhor-pais')
    })
      
    await inMemoryQuestionRepository.create(newQuestion)
    const result = await sut.execute({
      slug: 'melhor-pais'
    })
    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      }),

    })
  })
})
