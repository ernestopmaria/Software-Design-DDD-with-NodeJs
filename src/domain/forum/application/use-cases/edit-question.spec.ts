import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "./edit-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";


let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe(' Edit question', () => {

  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })


  it(' should be able to update a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
      title: 'Title-1',
      content: 'Content-1'
    },
      new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      title: 'Title-2',
      content: 'Content-1',
      questionId: 'question-1'
    }
    )
    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'Title-2',
      content: 'Content-1',
    })

  }

  )

  it('it should not be able to update a question from another user', async () => {

    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
      title: 'Title-1',
      content: 'Content-1'
    },
      new UniqueEntityID('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      title: 'Title-2',
      content: 'Content-1',
      questionId: 'question-1'

    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  }
  )



})