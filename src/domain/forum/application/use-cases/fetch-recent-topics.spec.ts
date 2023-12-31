import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository"
import { FetchRecentQuestionsUseCase } from "./fetch-recent-topics"
import { makeQuestion } from "test/factories/make-question"
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository"


let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch questions', () => {
  beforeEach(async () => {
     inMemoryQuestionAttachmentsRepository= new  InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentsRepository),
      sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  })

  it('it should be able to fetch questions', async () => {

    await inMemoryQuestionRepository.create(makeQuestion({
      createdAt: new Date(2023, 11, 20)
    }))
    await inMemoryQuestionRepository.create(makeQuestion({
      createdAt: new Date(2023, 11, 18)
    }))
    await inMemoryQuestionRepository.create(makeQuestion({
      createdAt: new Date(2023, 11, 23)
    }))

    const result= await sut.execute({
      page: 1
    })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({createdAt: new Date(2023, 11, 23) }),
      expect.objectContaining({createdAt: new Date(2023, 11, 20) }),
      expect.objectContaining({createdAt: new Date(2023, 11, 18) })
    ])
  })

  it('it should be able to fetch paginated recents questions', async () => {

    for (let i = 1; i<=22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())      
    }
  
     const result = await sut.execute({
      page: 2
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
