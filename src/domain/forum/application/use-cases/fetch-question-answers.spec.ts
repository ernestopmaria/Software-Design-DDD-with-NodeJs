import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers"
import { makeAnswer } from "test/factories/make-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"


let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch questions answers ', () => {
  beforeEach(async () => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository(),
      sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('it should be able to fetch questions answers', async () => {

    await inMemoryAnswersRepository.create(makeAnswer(
      { questionId: new UniqueEntityID('question-1') }
    ))
    await inMemoryAnswersRepository.create(makeAnswer(
      { questionId: new UniqueEntityID('question-1') }
    ))
    await inMemoryAnswersRepository.create(makeAnswer(
      { questionId: new UniqueEntityID('question-1') }
    ))

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1,

    })


    expect(answers).toHaveLength(3)

  })

  it('it should be able to fetch paginated questions answers', async () => {

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(makeAnswer({
        questionId: new UniqueEntityID('question-1')
      }))
    }
    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 2
    })

    expect(answers).toHaveLength(2)
  })
})